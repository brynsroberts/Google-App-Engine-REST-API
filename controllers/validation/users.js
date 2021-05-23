const ApiError = require("../../error/error");
const { getSingleUser } = require("../../models/users");

const validateGetAllUsersReq = (req, res, next) => {
  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(ApiError.notAcceptable("Accept header must be application/json"));
    return false;
  }
  return true;
};

const validateGetReq = async (req, res, next, token_id) => {
  // accept header must not be set or be set to application/json
  const accepts = req.accepts("application/json");
  if (!accepts) {
    next(ApiError.notAcceptable("Accept header must be application/json"));
    return false;
  }

  // if user is not in databse - return error
  const user = await getSingleUser(req.params.user_id);
  if (user === undefined || user[0] === undefined) {
    next(ApiError.notFound("No user with this user_id exists"));
    return false;
  }

  // valid get boat request
  return true;
};

module.exports = { validateGetAllUsersReq, validateGetReq };
