const { Datastore } = require("@google-cloud/datastore");
const {
  getSingleBoat,
  getAllBoats,
  postSingleBoat,
  addBoatLoad,
  deleteSingleBoat,
  removeBoatLoad,
  putSingleBoat,
} = require("../models/boats");
const {
  getSingleUser,
  getAllUsers,
  patchSingleUser,
  removeSingleBoat,
} = require("../models/users");
const ApiError = require("../error/error");
const {
  getSingleLoad,
  addLoadBoat,
  removeLoadBoat,
} = require("../models/loads");
const {
  validatePostReqBody,
  validateGetReq,
  validateGetAllBoatsReq,
  boatBelongsToOwner,
  validatedLoadBoat,
  validatedRemoveBoatLoad,
  validateDeleteReq,
  validatePutReq,
  validatePatchReq,
} = require("./validation/boats");
const { authorizationExists, verifyToken } = require("./validation/token");

const getUserBoatCount = async (boats) => {
  if (boats.length === 0) {
    return 0;
  }

  const owner_id = boats[0]["owner"].split("/").pop();
  const owner = await getSingleUser(owner_id);
  return owner[0]["boats"].length;
};

const getBoats = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // authorize if accept header set
  const req_valid = validateGetAllBoatsReq(req, res, next);
  if (!req_valid) return;

  // for pagination - cursor will exist more than 5 results are left in the datastore
  if (Object.keys(req.query).includes("cursor")) {
    var cursor = req.query.cursor;
  }

  // get all users and find user with match token_id
  const users = await getAllUsers();
  const owner = users.filter((user) => {
    if (user.token_id === token_id) {
      return user;
    }
  });

  // need owner_self to filter datastore results
  const owner_id = owner[0][Datastore.KEY].id;
  const owner_self =
    req.protocol + "://" + req.get("host") + "/users/" + owner_id;

  // get all boats from datastore that have correct owner self
  const boats = await getAllBoats(cursor, owner_self);

  // get boats that belong to JTW owner and format boat for return
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

  // get total count for JWT user boats
  const boat_count = await getUserBoatCount(formattedBoats);

  // if more than 5 boats exist for user based on cursor
  if (boats[1].moreResults !== Datastore.NO_MORE_RESULTS) {
    res.status(200).json({
      owner_boat_count: boat_count,
      boats: formattedBoats,
      next:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "?cursor=" +
        boats[1].endCursor,
    });

    // less than 5 boats based on cursor
  } else {
    res
      .status(200)
      .json({ owner_boat_count: boat_count, boats: formattedBoats });
  }
};

const getBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // authorize if accept header set
  // authorize if boat in database
  // authorize if boat belongs to owner
  const valid_request = await validateGetReq(req, res, next, token_id);
  if (!valid_request) return;

  // get the boat from the datastore
  const boat_id = req.params.boat_id;
  const boat = await getSingleBoat(boat_id);

  // return JSON object of boat
  res.status(200).json({
    id: boat_id,
    ...boat[0],
    self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + boat_id,
  });
};

const postBoat = async (req, res, next) => {
  // validate request body
  const valid_body = validatePostReqBody(req, res, next);
  if (!valid_body) return;

  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

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
};

const deleteBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // validate request
  const valid_req = await validateDeleteReq(req, res, next, token_id);
  if (!valid_req) return;

  // get boat id from params
  const boat_id = req.params.boat_id;

  // remove each of the loads from the boat
  const boat = await getSingleBoat(boat_id);
  const { loads } = boat[0];
  loads.forEach(async (load) => {
    const load_id = load["id"];
    await removeLoadBoat(load_id);
  });

  // remove the boat from the user
  const user_id = boat[0]["owner"].split("/").pop();
  const boat_datastore_id = boat[0][Datastore.KEY].id;
  await removeSingleBoat(user_id, boat_datastore_id);

  // delete boat from datastore
  await deleteSingleBoat(boat_id);
  res.status(204).end();
};

const assignLoadToBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // validate request
  const valid_req = await validatedLoadBoat(req, next, token_id);
  if (!valid_req) return;

  // extract parameters from url
  const load_id = req.params.load_id;
  const boat_id = req.params.boat_id;

  // add the boat to the load
  const load_self_url =
    req.protocol + "://" + req.get("host") + "/loads/" + load_id;
  await addBoatLoad(boat_id, load_id, load_self_url);

  // add the load to the boat
  const boat = await getSingleBoat(boat_id);
  const boat_self_url =
    req.protocol + "://" + req.get("host") + req.baseUrl + "/" + boat_id;
  const boat_name = boat[0]["name"];
  await addLoadBoat(boat_id, load_id, boat_self_url, boat_name);
  res.status(204).end();
};

const removeLoadFromBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // validate request
  const valid_req = await validatedRemoveBoatLoad(req, next, token_id);
  if (!valid_req) return;

  // extract parameters from url
  const boat_id = req.params.boat_id;
  const load_id = req.params.load_id;

  // remove boat from load
  await removeBoatLoad(boat_id, load_id);
  await removeLoadBoat(load_id);
  res.status(204).end();
};

const putBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // validate request
  const req_valid = await validatePutReq(req, res, next, token_id);
  if (!req_valid) return;

  // update boat in database
  const { name, type, length } = req.body;
  const key = await putSingleBoat(name, type, length, req.params.boat_id);

  // add self attribute to location header
  res.location(
    req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.boat_id
  );

  const put_boat = await getSingleBoat(req.params.boat_id);
  // send back 200 reponse with application/json
  res.status(200).json({
    id: req.params.boat_id,
    ...put_boat[0],
    self:
      req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.boat_id,
  });
};

const patchBoat = async (req, res, next) => {
  // token cannot be undefined
  if (!authorizationExists(req, next)) return;

  // authorize token
  const token_id = await verifyToken(req, next);
  if (!token_id) return;

  // validate request
  const req_valid = await validatePatchReq(req, res, next, token_id);
  if (!req_valid) return;

  // update boat in database
  const boat = await getSingleBoat(req.params.boat_id);
  let { name, type, length } = req.body;

  // update variable to hold new user input or old values already stored in boat
  if (!name) {
    name = boat[0]["name"];
  }

  if (!type) {
    type = boat[0]["type"];
  }

  if (!length) {
    length = boat[0]["length"];
  }

  // path boat with new values
  const key = await putSingleBoat(name, type, length, req.params.boat_id);

  // send back 303 reponse with application/json
  res.status(200).json({
    id: req.params.boat_id,
    name: name,
    type: type,
    length: length,
    owner: boat[0].owner,
    loads: boat[0].loads,
    self:
      req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.boat_id,
  });
};

module.exports = {
  getBoat,
  getBoats,
  postBoat,
  deleteBoat,
  assignLoadToBoat,
  removeLoadFromBoat,
  putBoat,
  patchBoat,
};
