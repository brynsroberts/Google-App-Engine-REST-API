const { Datastore } = require("@google-cloud/datastore");
const { removeLoadBoat } = require("./loads");
const projectID = "robertb2-finalproject";
const datastore = new Datastore({ projectID: projectID });

const BOAT = "Boat";

const getAllBoats = async (cursor) => {
  const query = datastore.createQuery(BOAT).limit(5);
  if (cursor !== undefined) {
    query.start(cursor);
  }

  const entities = await datastore.runQuery(query);
  return entities;
};

const getSingleBoat = async (id) => {
  const key = datastore.key([BOAT, parseInt(id, 10)]);
  const boat = datastore.get(key).catch(() => undefined);
  return boat;
};

const postSingleBoat = async (name, type, length, owner_self) => {
  const key = datastore.key(BOAT);
  const newBoat = {
    name: name,
    type: type,
    length: length,
    loads: [],
    owner: owner_self,
  };
  await datastore.save({ key: key, data: newBoat });
  return key;
};

const addBoatLoad = async (boat_id, load_id, load_self_url) => {
  const key = datastore.key([BOAT, parseInt(boat_id, 10)]);
  const boat = await getSingleBoat(boat_id);
  const { name, type, length, loads, owner } = boat[0];
  let load_already_in_boat = false;
  for (const load of loads) {
    if (load["id"] === load_id) {
      load_already_in_boat = true;
      break;
    }
  }

  if (!load_already_in_boat) {
    loads.push({
      id: load_id,
      self: load_self_url,
    });
  }
  const newBoat = {
    name: name,
    type: type,
    length: length,
    owner: owner,
    loads: loads,
  };
  await datastore.save({ key: key, data: newBoat });
};

const removeBoatLoad = async (boat_id, load_id) => {
  const key = datastore.key([BOAT, parseInt(boat_id, 10)]);
  const boat = await getSingleBoat(boat_id);
  const { name, type, length, loads, owner } = boat[0];
  const newLoads = loads.filter((load) => load["id"] !== load_id);

  const newBoat = {
    name: name,
    type: type,
    length: length,
    owner: owner,
    loads: newLoads,
  };
  await datastore.save({ key: key, data: newBoat });
};

const deleteSingleBoat = async (boat_id) => {
  const key = datastore.key([BOAT, parseInt(boat_id, 10)]);
  const boat = await getSingleBoat(boat_id);
  const { loads } = boat[0];

  loads.forEach(async (load) => {
    const load_id = load["id"];
    await removeLoadBoat(load_id);
  });

  await datastore.delete(key);
  return;
};

module.exports = {
  getSingleBoat,
  getAllBoats,
  postSingleBoat,
  addBoatLoad,
  deleteSingleBoat,
  removeBoatLoad,
};
