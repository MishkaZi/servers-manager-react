const serversDao = require('./servers-dao');

async function getAllServers() {
  const servers = await serversDao.getAllServers();
  return servers;
}

async function updateServer(updatedServer) {
  const updatedServerId = await serversDao.updateServer(updatedServer);
  return updatedServerId;
}

module.exports = { getAllServers, updateServer };
