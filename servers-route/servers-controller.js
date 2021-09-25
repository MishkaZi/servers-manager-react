const express = require('express');
const serversLogic = require('./servers-logic');
const router = express.Router();

//get all servers
router.get('/', async (req, res) => {
  try {
    const servers = await serversLogic.getAllServers();
    res.json(servers);
  } catch (err) {
    console.error(err);
    res.status(600).send(err.message);
  }
});

//Update server status
router.put('/', async (req, res) => {
  try {
    const updatedServer = req.body;
    const updatedServerId = await serversLogic.updateServer(updatedServer);
    res.json(updatedServerId);
  } catch (err) {
    console.error(err);
    res.status(600).send(err.message);
  }
});

module.exports = router;
