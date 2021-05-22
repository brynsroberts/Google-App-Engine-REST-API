const { getAllUsers, getSingleUser } = require("../models/users");
const ApiError = require("../error/error");
const { Datastore } = require("@google-cloud/datastore");

const getUsers = async (req, res, next) => {
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
  res.status(200).json(formattedUsers);
};

const getUser = async (req, res, next) => {
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
  res.status(200).json({
    id_token: req.session.id_token,
    id_user: req.session.id_user,
  });
};

module.exports = {
  getUser,
  getUsers,
  getTokenInfo,
};
