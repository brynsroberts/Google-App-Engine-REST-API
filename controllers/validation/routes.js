const ApiError = require("../../error/error");

const getAllowed = (req, res, next) => {
  res.set("Accept", "GET");
  next(ApiError.methodNotAllowed("Method not allowed"));
  return;
};

const getPostAllowed = (req, res, next) => {
  res.set("Accept", "GET, POST");
  next(ApiError.methodNotAllowed("Method not allowed"));
  return;
};

const postAllowed = (req, res, next) => {
  res.set("Accept", "POST");
  next(ApiError.methodNotAllowed("Method not allowed"));
  return;
};

const getPutPatchDeleteAllowed = (req, res, next) => {
  res.set("Accept", "GET, PUT, PATCH, DELETE");
  next(ApiError.methodNotAllowed("Method not allowed"));
  return;
};

const putDeleteAllowed = (req, res, next) => {
  res.set("Accept", "PUT, DELETE");
  next(ApiError.methodNotAllowed("Method not allowed"));
  return;
};

module.exports = {
  getAllowed,
  getPostAllowed,
  postAllowed,
  getPutPatchDeleteAllowed,
  putDeleteAllowed,
};
