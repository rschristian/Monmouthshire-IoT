import axios from 'axios';
//import { API_URL, USER_ID} from './util/secrets';
import { fahrenheitToCelsius } from './util/readings';
import logger from './util/logger';

const API_URL = 'http://10.247.39.134:8000/api/v1';
const USER_ID = 'b8:27:eb:25:bf:f5';

export const postNewReading = (sensorReading) => {
	const url = `${API_URL}/sensorReadings/new`;
	delete sensorReading.units;
	
	logger.debug(`WE ARE SENDING THIS... to ${url}`);
	logger.debug(sensorReading);

	axios.post(url, {sensorReading: sensorReading})
		.then((res) => {})
		.catch((err) => logger.error(err));
}

export const postNewSensor = (sensor) => {
	const url = `${API_URL}/sensors/new`;
	sensor['userId'] = USER_ID;
	
	delete sensor.type;
	
	logger.debug('sending off sensor to server');
	axios.post(url, {sensor: sensor})
		.then((res) => {})
		.catch((err) => logger.error(err));
};

export const postNewRoom = (room) => {
	const url = `${API_URL}/room/new`;
	room['userId'] = USER_ID;
	
	logger.debug('sending off room to server');
	axios.post(url, {room: room})
		.then((res) => {})
		.catch((err) => logger.error(err));
};
