const connection = require('../connection-wrapper');

async function getAllServers() {
  let sql = `
  SELECT s.id serverId, s.server_name serverName, s.ip ip, 
  c.company_name hostingCompany, s.status status, s.date_time dateTime
  FROM servers s
  INNER JOIN companies c
  ON s.hosting_company=c.id; `;
  const servers = await connection.execute(sql);

  return servers;
}

async function updateServer(updatedServer) {
  let sql = `
  UPDATE servers s
  SET s.status='?'
  WHERE s.id='?';`;
  let parameters = [updatedServer.status, updatedServer.serverId];
  let result = await connection.executeWithParameters(sql, parameters);
  return result.insertId;
}

module.exports = { getAllServers, updateServer };
