const { getAllUsers } = require("../models/users");
const { Datastore } = require("@google-cloud/datastore");

const getUsers = async (req, res, next) => {
  const users = await getAllUsers();
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

module.exports = {
  getUsers,
};
