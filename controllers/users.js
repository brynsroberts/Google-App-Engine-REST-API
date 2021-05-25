const { getAllUsers, getSingleUser } = require("../models/users");
const {
  validateGetAllUsersReq,
  validateGetReq,
} = require("./validation/users");
const ApiError = require("../error/error");
const { Datastore } = require("@google-cloud/datastore");

const getUsers = async (req, res, next) => {
  // validate request
  const valid_req = validateGetAllUsersReq(req, res, next);
  if (!valid_req) return;

  // get all users from datastore
  const users = await getAllUsers();

  // return formatted user with each user having an id and self field added
  const formattedUsers = users.map((user) => {
    const id = user[Datastore.KEY].id;
    return {
      id: id,
      ...user,
      self: req.protocol + "://" + req.get("host") + req.baseUrl + "/" + id,
    };
  });

  // get user count
  const user_count = formattedUsers.length;

  // send json object back
  res.status(200).json({ total_user_count: user_count, users: formattedUsers });
};

const getUser = async (req, res, next) => {
  // validate request
  const valid_req = await validateGetReq(req, res, next);
  if (!valid_req) return;

  // get single user specified from /users/:user_id
  const user = await getSingleUser(req.params.user_id);

  // if user does not exist in datastore - return error
  if (user === undefined || user[0] === undefined) {
    next(ApiError.notFound("No user with this user_id exists"));
    return;
  }

  // user exists in datastore - return json object of user
  const formattedUsers = {
    id: req.params.user_id,
    ...user[0],
    self:
      req.protocol +
      "://" +
      req.get("host") +
      req.baseUrl +
      "/" +
      req.params.user_id,
  };
  res.status(200).json(formattedUsers);
};

const getTokenInfo = (req, res, next) => {
  // return user_id and token_id for front end userinfo page
  res.status(200).json({
    id_token: req.session.id_token,
    id_user: req.session.id_user,
    self: req.session.self,
  });
};

module.exports = {
  getUser,
  getUsers,
  getTokenInfo,
};
