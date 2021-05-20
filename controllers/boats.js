const { Datastore } = require("@google-cloud/datastore");
const {
  getSingleBoat,
  getAllBoats,
  postSingleBoat,
  addBoatLoad,
  deleteSingleBoat,
  removeBoatLoad,
} = require("../models/boats");
const { getAllUsers } = require("../models/users");
const { patchSingleUser } = require("../models/users");
const ApiError = require("../error/error");
const {
  getSingleLoad,
  addLoadBoat,
  removeLoadBoat,
} = require("../models/loads");
const { validatePostReqBody } = require("./validation/boat");
const { authorizationExists, verifyToken } = require("./validation/token");

const getBoats = async (req, res, next) => {
  if (Object.keys(req.query).includes("cursor")) {
    var cursor = req.query.cursor;
  }
  const boats = await getAllBoats(cursor);
  const formattedBoats = boats[0].map((boat) => {
    return {
      id: boat[Datastore.KEY].id,
      ...boat,
      self:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "/" +
        boat[Datastore.KEY].id,
    };
  });

  if (boats[1].moreResults !== Datastore.NO_MORE_RESULTS) {
    res.status(200).json({
      items: formattedBoats,
      next:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "?cursor=" +
        boats[1].endCursor,
    });
  } else {
    res.status(200).json({ items: formattedBoats });
  }
};

const getBoat = async (req, res, next) => {
  const id = req.params.id;
  const boat = await getSingleBoat(id);
  if (boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return;
  }

  res.status(200).json({
    id: id,
    ...boat[0],
    self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + id,
  });
};

const postBoat = async (req, res, next) => {
  // validate request body
  const valid_body = validatePostReqBody(req, res, next);

  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // if JWT is valid and body is valid
  if (valid_body) {

    // get self URL from database and store in owner_self
    const users = await getAllUsers();
    let owner_self = "";
    let user_id;
    for (const user of users) {
      if (user.token_id === token_id) {
        // update owner_self to include user id
        owner_self =
          req.protocol +
          "://" +
          req.get("host") +
          "/users/" +
          user[Datastore.KEY].id;

        // set user_id
        user_id = user[Datastore.KEY].id;
        break;
      }
    }

    // post new boat to datastore
    const { name, type, length } = req.body;
    const key = await postSingleBoat(name, type, length, owner_self);

    // add boat to user datastore
    const boat_self =
      req.protocol + "://" + req.get("host") + req.baseUrl + "/" + key.id;
    await patchSingleUser(user_id, boat_self);

    // return JSON object of posted boat
    res.status(201).json({
      id: key.id,
      name: name,
      type: type,
      length: length,
      owner: owner_self,
      loads: [],
      self: boat_self,
    });
  }
};

const deleteBoat = async (req, res, next) => {
  const id = req.params.id;
  const boat = await getSingleBoat(id);
  if (boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return;
  }

  await deleteSingleBoat(id);

  res.status(204).end();
};

const assignLoadToBoat = async (req, res, next) => {
  const boat_id = req.params.boat_id;
  const boat = await getSingleBoat(boat_id);
  if (boat[0] === undefined) {
    next(ApiError.notFound("The specified boat and/or load does not exist"));
    return;
  }

  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  if (load[0] === undefined) {
    next(ApiError.notFound("The specified boat and/or load does not exist"));
    return;
  }

  if (load[0]["carrier"]["name"] !== null) {
    next(ApiError.forbidden("The load is already assigned to another boat"));
    return;
  }

  const load_self_url =
    req.protocol + "://" + req.get("host") + "/loads/" + load_id;
  await addBoatLoad(boat_id, load_id, load_self_url);

  const boat_self_url =
    req.protocol + "://" + req.get("host") + req.baseUrl + "/" + boat_id;
  const boat_name = boat[0]["name"];
  await addLoadBoat(boat_id, load_id, boat_self_url, boat_name);
  res.status(204).end();
};

const removeLoadFromBoat = async (req, res, next) => {
  const boat_id = req.params.boat_id;
  const boat = await getSingleBoat(boat_id);
  if (boat[0] === undefined) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return;
  }

  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  if (load[0] === undefined) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return;
  }

  if (load[0]["carrier"]["id"] !== boat_id) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return;
  }

  await removeBoatLoad(boat_id, load_id);
  await removeLoadBoat(load_id);
  res.status(204).end();
};

module.exports = {
  getBoat,
  getBoats,
  postBoat,
  deleteBoat,
  assignLoadToBoat,
  removeLoadFromBoat,
};
