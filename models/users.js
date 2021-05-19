const { Datastore } = require("@google-cloud/datastore");
const projectID = "robertb2-finalproject";
const datastore = new Datastore({ projectID: projectID });

const USER = "User";

const getAllUsers = async () => {
  const query = datastore.createQuery(USER);
  const entities = await datastore.runQuery(query);
  return entities[0];
};

const postSingleUser = async (token_id) => {
  const key = datastore.key(USER);
  const new_user = { token_id: token_id };
  await datastore.save({ key: key, data: new_user });
  return key;
};

module.exports = { getAllUsers, postSingleUser };
