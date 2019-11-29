import logger from '../util/logger.js';

class SensorRepository {
	constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
		CREATE TABLE IF NOT EXISTS sensors (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  node_id INTEGER,
		  type TEXT,
		  location TEXT,
		  configured INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }

  create(sensor) {
	  this.sensorAlreadyAddedToNetwork(sensor.node_id)
	  .then((result) => {
		  if(result){
			  return;
		  }
		   logger.debug('WE ARE adding node to network as it does not already exist in the datbase');
		  return this.dao.run(
		  'INSERT INTO sensors (node_id, type, location) VALUES (?,?,?)',
		  [sensor.node_id, sensor.type, sensor.location]);
	   })
	   .catch((err) => {
		   logger.error(err);
		});
  }
  
  sensorAlreadyAddedToNetwork(nodeId){
	  return this.dao.get(`SELECT * FROM sensors WHERE node_id = ?`, [nodeId]);
  }

  updateSensorLocation(sensorId, location) {
    return this.dao.run(
      `UPDATE sensors SET location = ? WHERE node_id = ?`,
      [location, sensorId]
    );
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM projects WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.get(`SELECT * FROM sensors`)
  }

  getThoseNotConfigured() {
    return this.dao.get(`SELECT * FROM sensors WHERE configured = 0`)
  }
}

export default SensorRepository;
