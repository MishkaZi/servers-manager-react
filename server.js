const express = require('express');
const cors = require('cors');
const serversController = require('./servers-route/servers-controller');

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json());
server.use('/servers', serversController);

server.listen(3001, () => {
  console.log('Running on 3001');
});
