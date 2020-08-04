const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'tutorial' });
const kind = 'files';

function key(id) {
  return ds.key([kind, id]);
}

// asynchronously get the entity
module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return data.val;
  return 0;
};

// asynchronously set the entitly value to val
module.exports.put = async (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return val;
};

// asynchronously add a value to the current counter value
module.exports.post = async (id, val) => {
  originalVal = await this.get(id)  //gets current counter value
  val += originalVal
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return val;
};

// asynchronously delete the entity
module.exports.delete = async (id) => {
  ds.delete(key(id), function(err) {
  if (err) {
console.log(err)
 }
})};

