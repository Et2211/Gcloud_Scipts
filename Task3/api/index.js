const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
const db = require(`./db-inmemory`);
module.exports = api;

//requests a random number 
api.get('/random', async (req, res) => {
    try {
        res.set('Content-Type', 'text/plain')
        res.json((await db.getRandom(req.user.emails[0].value)));
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

//requests the roles of all users
api.get('/user/roles', async (req, res) => {
    try {
        res.json((await db.getRoles(req.user.emails[0].value)));
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

//Send a request to be added as a user
api.post('/user/request', async (req, res) => {
    try {
        await db.requestRoles(req.user.emails[0].value);
        res.sendStatus(202)
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

//requests a list of all known users 
//Admin only
api.get('/users', async (req, res) => {
    try {
        res.json((await db.getUsers(req.user.emails[0].value)));
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

//requests all users wanting approval to be a user
//Admin only
api.get('/user/request', async (req, res) => {
    try {
        res.json((await db.getRequests(req.user.emails[0].value)));
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

//Approves an account to be a user
//Admin only
api.post('/user/approve', bodyParser.text(), async (req, res) => {
    try {
        res.json(await db.approveRole(req.user.emails[0].value, req.body));
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

//Deletes a user
//Admin only
api.delete('/user/*', async (req, res) => {
    try {
        await db.deleteUser(req.user.emails[0].value, req.params[0]);
        res.sendStatus(204)
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});