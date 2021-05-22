const { Datastore } = require("@google-cloud/datastore");
const projectID = "robertb2-finalproject";
const datastore = new Datastore({ projectID: projectID });

const USER = "User";

const getAllUsers = async () => {
  const query = datastore.createQuery(USER);
  const entities = await datastore.runQuery(query);
  return entities[0];
};

const getSingleUser = async (id) => {
  const key = datastore.key([USER, parseInt(id, 10)]);
  const user = datastore.get(key).catch(() => undefined);
  return user;
};

const postSingleUser = async (token_id) => {
  const key = datastore.key(USER);
  const new_user = { token_id: token_id, boats: [] };
  await datastore.save({ key: key, data: new_user });
  return key;
};

const patchSingleUser = async (id, boat_self) => {
  const key = datastore.key([USER, parseInt(id, 10)]);
  let user = await getSingleUser(id);
  user[0].boats.push(boat_self);
  await datastore.save({ key: key, data: user[0] });
  return key;
};

const removeSingleBoat = async (user_id, boat_id) => {
  // get user
  const key = datastore.key([USER, parseInt(user_id, 10)]);
  let user = await getSingleUser(user_id);

  // remove boat_id from user boats
  const boat_list = user[0].boats.filter((boat) => {
    const this_boat_id = boat.split("/").pop();
    if (this_boat_id !== boat_id) {
      return boat;
    }
  });
  user[0].boats = [...boat_list];

  // save user in datastore
  await datastore.save({ key: key, data: user[0] });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  patchSingleUser,
  removeSingleBoat,
};
