const ApiError = require("../../error/error");
const { getSingleBoat } = require("../../models/boats");

const validateString = (input) => {
  // validate input is not empty
  if (input.length === 0) {
    return false;
  }

  // validate input is not over 256 characters
  if (input.length > 256) {
    return false;
  }

  // validate input does not contain special characters
  // source: https://stackoverflow.com/questions/11896599/javascript-code-to-check-special-characters
  const patternSpecialCharacters = new RegExp(
    /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?.]/
  );
  if (patternSpecialCharacters.test(input)) {
    return false;
  }

  // validate type of input
  if (typeof input !== "string") {
    return false;
  }

  // valid input string
  return true;
};

const validateLength = (length) => {
  // length must not contain symbol characters
  const patternSpecialCharacters = new RegExp(
    /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?.]/
  );
  if (patternSpecialCharacters.test(length)) {
    return false;
  }

  // length must not contain alphabet characters
  const patternAlpha = new RegExp(/[A-Za-z]/);
  if (patternAlpha.test(length)) {
    return false;
  }

  // length must be greater than 0
  if (length === 0) {
    return false;
  }

  // validate type of input
  if (typeof length !== "number") {
    return false;
  }

  // valid input length
  return true;
};

const validatePutReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.id);
  if (boat[0] === undefined) {
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
  const accepts = req.accepts(["*/*", "application/json"]);
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

  // boat name cannot be in currBoatNames
  if (currBoatNames.includes(req.body.name)) {
    next(
      ApiError.forbidden("Object name attribute already exists in database")
    );
    return false;
  }

  // remove boat name from currBoatNames array
  let newList = currBoatNames.filter((name) => {
    if (name !== boat[0]["name"]) {
      return name;
    }
  });
  currBoatNames = [...newList];

  // add name to currBoatNames
  currBoatNames.push(req.body.name);

  // valid post request
  return true;
};

const validatePatchReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.id);
  if (boat[0] === undefined) {
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
  const accepts = req.accepts(["*/*", "application/json"]);
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

  if (req.body.name) {
    // boat name cannot be in currBoatNames
    if (currBoatNames.includes(req.body.name)) {
      next(
        ApiError.forbidden("Object name attribute already exists in database")
      );
      return false;
    }

    // remove boat name from currBoatNames array
    let newList = currBoatNames.filter((name) => {
      if (name !== boat[0]["name"]) {
        return name;
      }
    });
    currBoatNames = [...newList];

    // add name to currBoatNames
    currBoatNames.push(req.body.name);
  }

  // valid post request
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

const validateDeleteReq = async (req, res, next) => {
  // if boat is not in database - return error
  const boat = await getSingleBoat(req.params.id);
  if (boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // remove boat name from currBoatNames array
  let newList = currBoatNames.filter((name) => {
    if (name !== boat[0]["name"]) {
      return name;
    }
  });
  currBoatNames = [...newList];

  // valid delete boat request
  return true;
};

const validateGetReq = async (req, res, next) => {
  // accept header must not be set or be set to application/json
  const accepts = req.accepts(["text/html", "application/json"]);
  if (!accepts) {
    next(
      ApiError.notAcceptable(
        "Accept header must be application/json or text/html"
      )
    );
    return false;
  }

  // if boat is not in databse - return error
  const boat = await getSingleBoat(req.params.id);
  if (boat[0] === undefined) {
    next(ApiError.notFound("No boat with this boat_id exists"));
    return false;
  }

  // valid get boat request
  return true;
};

module.exports = {
  validatePostReqBody,
  validatePutReq,
  validatePatchReq,
  validateDeleteReq,
  validateGetReq,
};
