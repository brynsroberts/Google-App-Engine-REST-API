const { Datastore } = require("@google-cloud/datastore");
const {
  getSingleLoad,
  getAllLoads,
  postSingleLoad,
  deleteSingleLoad,
  getLoadCount,
  putSingleLoad,
} = require("../models/loads");
const ApiError = require("../error/error");
const { removeBoatLoad } = require("../models/boats");
const {
  validatePostReqBody,
  validateGetReq,
  validateDeleteReq,
  validateGetAllReq,
  validatePutReq,
  validatePatchReq,
} = require("./validation/loads");

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
  // validate request
  const valid_req = await validateGetAllReq(req, res, next);
  if (!valid_req) return;

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
  // determine if request is valid
  const valid_req = await validateDeleteReq(req, res, next);
  if (!valid_req) return;

  // if load is on a boat - delete load from boat
  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  const boat_id = load[0]["carrier"]["id"];
  if (boat_id !== null) {
    await removeBoatLoad(boat_id, load_id);
  }

  // delete load from datastore
  await deleteSingleLoad(load_id);
  res.status(204).end();
};

const putLoad = async (req, res, next) => {
  // validate request
  const req_valid = await validatePutReq(req, res, next);
  if (!req_valid) return;

  // update load in database
  const { volume, content, creation_date } = req.body;
  const key = await putSingleLoad(
    volume,
    content,
    creation_date,
    req.params.load_id
  );

  // add self attribute to location header
  res.location(
    req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.load_id
  );

  const put_load = await getSingleLoad(req.params.load_id);
  // send back 200 reponse with application/json
  res.status(200).json({
    id: req.params.load_id,
    ...put_load[0],
    self:
      req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.load_id,
  });
};

const patchLoad = async (req, res, next) => {
  // validate request
  const req_valid = await validatePatchReq(req, res, next);
  if (!req_valid) return;

  // update load in database
  const load = await getSingleLoad(req.params.load_id);
  let { volume, content, creation_date } = req.body;

  // update variable to hold new user input or old values already stored in boat
  if (!volume) {
    volume = load[0]["volume"];
  }

  if (!content) {
    content = load[0]["content"];
  }

  if (!creation_date) {
    creation_date = load[0]["creation_date"];
  }

  // path boat with new values
  const key = await putSingleLoad(
    volume,
    content,
    creation_date,
    req.params.load_id
  );

  // send back 200 reponse with application/json
  res.status(200).json({
    id: req.params.load_id,
    volume: volume,
    content: content,
    creation_date: creation_date,
    carrier: load[0].carrier,
    self:
      req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.load_id,
  });
};

module.exports = {
  getLoads,
  getLoad,
  postLoad,
  deleteLoad,
  putLoad,
  patchLoad,
};
