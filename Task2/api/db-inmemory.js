let data = {
    pets: 15,
    message: 42,
    shoppinglist: 12,
}
// asynchronously get the counter value
  module.exports.get = (id) => {
    if (data[id] == undefined)  data[id] = 0;
      return data[id];

  };

// asynchronously add val to the counter's value
  module.exports.post = (id, val) => {
    if (data[id] == undefined) data[id] = 0;

    data[id] = parseInt(data[id], 10);
    data[id] += val;
    return data[id];
  };
// asynchronously set the counter's value to val
  module.exports.put = (id, val) => {
    if (data[id] == undefined) data[id] = 0;
    
    data[id] = parseInt(data[id], 10);
    data[id] = val;
    return data[id]
  };
// asynchronously delete the counter
  module.exports.delete = (id) => {
    delete data[id]
  };
