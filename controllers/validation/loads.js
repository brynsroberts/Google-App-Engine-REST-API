const ApiError = require("../../error/error");
const {
  validateString,
  validateLength,
  validateDate,
} = require("./validation");

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
  keys = ["volume", "content", "creation_date"];
  for (const key in req.body) {
    if (!keys.includes(key)) {
      next(
        ApiError.badRequest("Request object does not have correct attributes")
      );
      return false;
    }
  }

  // request must contain name, type and length attributes
  if (!req.body.volume || !req.body.content || !req.body.creation_date) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // attributes must be specified format
  if (
    !validateLength(req.body.volume) ||
    !validateString(req.body.content) ||
    !validateDate(req.body.creation_date)
  ) {
    next(
      ApiError.badRequest("Request object does not have correct attributes")
    );
    return false;
  }

  // valid post request
  return true;
};

module.exports = { validatePostReqBody };
