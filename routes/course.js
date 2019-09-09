const axios = require('axios');
const conf = require('../config');

const courseService = axios.create({
	baseURL: conf.routes.course.base,
	timeout: 1000,
});

module.exports = {
	courseService,
	routes: conf.routes.course,
};