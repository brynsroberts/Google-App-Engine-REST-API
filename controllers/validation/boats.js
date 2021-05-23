const ApiError = require("../../error/error");
const { getSingleBoat } = require("../../models/boats");
const { getSingleUser } = require("../../models/users");
const { getSingleLoad } = require("../../models/loads");
const { validateString, validateLength } = require("./validation");

const validatePutReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.boat_id);
  if (boat === undefined || boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // content type must be application/json
  if (req.get("content-type") !== "application/json") {
    next(
      ApiError.unsupportedMediaType(
        "Content-Type header must be application/json"
      )
    );
    return false;
  }

  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(
      ApiError.notAcceptable("Accept header must be application/json if set")
    );
    return false;
  }

  // request must contain only name, type and length attributes
  keys = ["name", "type", "length"];
  for (const key in req.body) {
    if (!keys.includes(key)) {
      next(
        ApiError.badRequest("Request object does not have correct attributes")
      );
      return false;
    }
  }

  // request must contain name, type and length attributes
  if (!req.body.name || !req.body.type || !req.body.length) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // attributes must be specified format
  if (
    !validateString(req.body.name) ||
    !validateString(req.body.type) ||
    !validateLength(req.body.length)
  ) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // valid post request
  return true;
};

const validatePatchReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.boat_id);
  if (boat === undefined || boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // content type must be application/json
  if (req.get("content-type") !== "application/json") {
    next(
      ApiError.unsupportedMediaType(
        "Content-Type header must be application/json"
      )
    );
    return false;
  }

  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(
      ApiError.notAcceptable("Accept header must be application/json if set")
    );
    return false;
  }

  // request must contain only name, type and length attributes
  keys = ["name", "type", "length"];
  let count = 0;
  for (const key in req.body) {
    if (!keys.includes(key)) {
      next(
        ApiError.badRequest("Request object does not have correct attributes")
      );
      return false;
    }

    count++;
  }

  // request must contain name, type and length attributes
  if (count === 0 || count === 3) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // attributes must be specified format
  if (
    (req.body.name && !validateString(req.body.name)) ||
    (req.body.type && !validateString(req.body.type)) ||
    (req.body.length && !validateLength(req.body.length))
  ) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // valid patch request
  return true;
};

const validatePostReqBody = (req, res, next) => {
  // content type must be application/json
  if (req.get("content-type") !== "application/json") {
    next(
      ApiError.unsupportedMediaType(
        "Content-Type header must be application/json"
      )
    );
    return false;
  }

  // accept header must be set to application/json
  const accepts = req.accepts(["application/json"]);
  if (!accepts) {
    next(ApiError.notAcceptable("Accept header must be application/json"));
    return false;
  }

  // request must contain only name, type and length attributes
  keys = ["name", "type", "length"];
  for (const key in req.body) {
    if (!keys.includes(key)) {
      next(
        ApiError.badRequest("Request object does not have correct attributes")
      );
      return false;
    }
  }

  // request must contain name, type and length attributes
  if (!req.body.name || !req.body.type || !req.body.length) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // attributes must be specified format
  if (
    !validateString(req.body.name) ||
    !validateString(req.body.type) ||
    !validateLength(req.body.length)
  ) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // valid post request
  return true;
};

const validateDeleteReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.boat_id);
  if (boat === undefined || boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // valid delete boat request
  return true;
};

const validateGetReq = async (req, res, next, token_id) => {
  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(ApiError.notAcceptable("Accept header must be application/json"));
    return false;
  }

  // if boat is not in databse - return error
  const boat = await getSingleBoat(req.params.boat_id);
  if (boat === undefined || boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // if boat does not belong to owner - return an error
  const owner_id = boat[0]["owner"].split("/").pop();
  const owner = await getSingleUser(owner_id);
  if (owner[0]["token_id"] !== token_id) {
    next(
      ApiError.unauthorized(
        "The request is either missing or has invalid JWT bearer token"
      )
    );
    return false;
  }

  // valid get boat request
  return true;
};

const validateGetAllBoatsReq = (req, res, next) => {
  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(ApiError.notAcceptable("Accept header must be application/json"));
    return false;
  }
  return true;
};

const boatBelongsToOwner = async (boat, token_id) => {
  // if boat does not belong to owner - return false
  const owner_id = boat["owner"].split("/").pop();
  const owner = await getSingleUser(owner_id);
  if (owner[0]["token_id"] !== token_id) {
    return false;
  }
  return true;
};

const validatedLoadBoat = async (req, next) => {
  // if boat does not exist - return error
  const boat_id = req.params.boat_id;
  const boat = await getSingleBoat(boat_id);
  if (boat === undefined || boat[0] === undefined) {
    next(ApiError.notFound("The specified boat and/or load does not exist"));
    return false;
  }

  // if load does not exist - return error
  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  if (load === undefined || load[0] === undefined) {
    next(ApiError.notFound("The specified boat and/or load does not exist"));
    return false;
  }

  // if load is already on a boat - return error
  if (load[0]["carrier"]["name"] !== null) {
    next(ApiError.forbidden("The load is already assigned to another boat"));
    return false;
  }

  return true;
};

const validatedRemoveBoatLoad = async (req, next) => {
  // if boat does not exist - return error
  const boat_id = req.params.boat_id;
  const boat = await getSingleBoat(boat_id);
  if (boat[0] === undefined) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return false;
  }

  // if load does not exist - return error
  const load_id = req.params.load_id;
  const load = await getSingleLoad(load_id);
  if (load[0] === undefined) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return false;
  }

  // if the boat does not have the load on it - return error
  if (load[0]["carrier"]["id"] !== boat_id) {
    next(
      ApiError.notFound(
        "No boat with this boat_id has a load with this load_id"
      )
    );
    return false;
  }

  return true;
};

module.exports = {
  validatePostReqBody,
  validatePutReq,
  validatePatchReq,
  validateDeleteReq,
  validateGetReq,
  validateGetAllBoatsReq,
  boatBelongsToOwner,
  validateString,
  validateLength,
  validatedLoadBoat,
  validatedRemoveBoatLoad,
};
