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
  const user = datastore.get(key).catch(() => undefined);;
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

module.exports = {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  patchSingleUser,
};
