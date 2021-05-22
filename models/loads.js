const { Datastore } = require("@google-cloud/datastore");
const projectID = "robertb2-finalproject";
const datastore = new Datastore({ projectID: projectID });

const LOAD = "Load";

const getSingleLoad = async (id) => {
  const key = datastore.key([LOAD, parseInt(id, 10)]);
  const load = datastore.get(key).catch(() => undefined);;
  return load;
};

const getAllLoads = async (cursor) => {
  const query = datastore.createQuery(LOAD).limit(5);
  if (cursor !== undefined) {
    query.start(cursor);
  }

  const entities = await datastore.runQuery(query);
  return entities;
};

const postSingleLoad = async (volume, content, creation_date) => {
  const key = datastore.key(LOAD);
  const newLoad = {
    volume: volume,
    content: content,
    creation_date: creation_date,
    carrier: { id: null, name: null, self: null },
  };
  await datastore.save({ key: key, data: newLoad });
  return key;
};

const addLoadBoat = async (boat_id, load_id, boat_self_url, boat_name) => {
  const key = datastore.key([LOAD, parseInt(load_id, 10)]);
  const load = await getSingleLoad(load_id);
  const { volume, content, creation_date, carrier } = load[0];
  carrier["id"] = boat_id;
  carrier["name"] = boat_name;
  carrier["self"] = boat_self_url;
  const newLoad = {
    volume: volume,
    content: content,
    creation_date: creation_date,
    carrier: carrier,
  };
  await datastore.save({ key: key, data: newLoad });
};

const removeLoadBoat = async (load_id) => {
  const key = datastore.key([LOAD, parseInt(load_id, 10)]);
  const load = await getSingleLoad(load_id);
  const { volume, content, creation_date, carrier } = load[0];
  carrier["id"] = null;
  carrier["name"] = null;
  carrier["self"] = null;
  const newLoad = {
    volume: volume,
    content: content,
    creation_date: creation_date,
    carrier: carrier,
  };
  await datastore.save({ key: key, data: newLoad });
};

const deleteSingleLoad = async (load_id) => {
  const key = datastore.key([LOAD, parseInt(load_id, 10)]);
  await datastore.delete(key);
  return;
};

module.exports = {
  getSingleLoad,
  getAllLoads,
  postSingleLoad,
  addLoadBoat,
  removeLoadBoat,
  deleteSingleLoad,
};
