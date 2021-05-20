const { Datastore } = require("@google-cloud/datastore");
const {
  getSingleLoad,
  getAllLoads,
  postSingleLoad,
  deleteSingleLoad,
} = require("../models/loads");

const ApiError = require("../error/error");
const { removeBoatLoad } = require("../models/boats");

const getLoad = async (req, res, next) => {
  const id = req.params.id;
  const load = await getSingleLoad(id);
  if (load[0] === undefined) {
    next(ApiError.notFound("No load with this load_id exists"));
    return;
  }
  res.status(200).json({
    id: id,
    ...load[0],
    self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + id,
  });
};

const getLoads = async (req, res, next) => {
  if (Object.keys(req.query).includes("cursor")) {
    var cursor = req.query.cursor;
  }
  const loads = await getAllLoads(cursor);
  const formattedLoads = loads[0].map((load) => {
    return {
      id: load[Datastore.KEY].id,
      ...load,
      self:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "/" +
        load[Datastore.KEY].id,
    };
  });

  if (loads[1].moreResults !== Datastore.NO_MORE_RESULTS) {
    res.status(200).json({
      items: formattedLoads,
      next:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "?cursor=" +
        loads[1].endCursor,
    });
  } else {
    res.status(200).json({ items: formattedLoads });
  }
};

const postLoad = async (req, res, next) => {
  const { volume, content, creation_date } = req.body;
  if (!volume || !content || !creation_date) {
    next(
      ApiError.badRequest(
        "The request object is missing at least one of the required attributes"
      )
    );
    return;
  }

  const key = await postSingleLoad(volume, content, creation_date);
  res.status(201).json({
    id: key.id,
    volume: volume,
    content: content,
    creation_date: creation_date,
    carrier: { id: null, name: null, self: null },
    self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + key.id,
  });
};

const deleteLoad = async (req, res, next) => {
  const load_id = req.params.id;
  const load = await getSingleLoad(load_id);
  if (load[0] === undefined) {
    next(ApiError.notFound("No load with this load_id exists"));
    return;
  }

  const boat_id = load[0]["carrier"]["id"];
  if (boat_id !== null) {
    await removeBoatLoad(boat_id, load_id);
  }

  await deleteSingleLoad(load_id);
  res.status(204).end();
};

module.exports = { getLoads, getLoad, postLoad, deleteLoad };
