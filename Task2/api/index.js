const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
module.exports = api;

const db = require(`./db-datastore`);

// asynchronously get the counter value
api.get('/:id(\\w+)', async (req, res) => {
    try{
      res.json((await db.get(req.params.id)));
    }
    catch (e){
      console.error(e);
    res.sendStatus(500);
  }
    });

// asynchronously add val to the counter's value
 api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try{
    res.json(await db.post(req.params.id, parseInt(req.body, 10)));
  }
  catch (e){
    console.error(e);
    res.sendStatus(500);
  }
  });

// asynchronously set the counter's value to val
  api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
    try{
    res.json(await db.put(req.params.id, parseInt(req.body, 10)));
    }
    catch(e)
    {
      console.error(e);
      res.sendStatus(500);
    }
  });
  
// asynchronously delete the counter
  api.delete('/:id(\\w+)', async (req, res) => {
    try{
      db.delete(req.params.id)
      res.sendStatus(204);
    }
    catch(e) {
      console.log(e)
      res.sendStatus(500);
    }
});
