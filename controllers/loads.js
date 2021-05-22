const { Datastore } = require("@google-cloud/datastore");
const {
  getSingleLoad,
  getAllLoads,
  postSingleLoad,
  deleteSingleLoad,
  getLoadCount,
} = require("../models/loads");
const ApiError = require("../error/error");
const { removeBoatLoad } = require("../models/boats");
const { validatePostReqBody, validateGetReq } = require("./validation/loads");

const getLoad = async (req, res, next) => {
  // validate request
  const valid_req = await validateGetReq(req, res, next);
  if (!valid_req) return;

  // get load from return datastore and return JSON
  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  res.status(200).json({
    id: load_id,
    ...load[0],
    self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + load_id,
  });
};

const getLoads = async (req, res, next) => {
  // for pagination - cursor will exist more than 5 results are left in the datastore
  if (Object.keys(req.query).includes("cursor")) {
    var cursor = req.query.cursor;
  }

  // get all loads and format loads for return
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

  // get total count of loads
  const load_count = await getLoadCount();

  // if more than 5 loads past cursor - return paginated result
  if (loads[1].moreResults !== Datastore.NO_MORE_RESULTS) {
    res.status(200).json({
      total_load_count: load_count,
      items: formattedLoads,
      next:
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "?cursor=" +
        loads[1].endCursor,
    });

    // less than or equal to 5 loads - no need to paginate results
  } else {
    res
      .status(200)
      .json({ total_load_count: load_count, items: formattedLoads });
  }
};

const postLoad = async (req, res, next) => {
  // validate request body
  const valid_req = validatePostReqBody(req, res, next);
  if (!valid_req) return;

  // post load to datastore and return JSON
  const { volume, content, creation_date } = req.body;
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
