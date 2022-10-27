const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { TOKEN } = require('../config');

function authorization(req, res, next) {

	try {
		const jwtToken = req.header('token');

		// Check if there is a token
		if (!jwtToken) {
			throw createError(403, 'Authorization denied')
		}

		// Verify token
		const payload = jwt.verify(jwtToken, TOKEN);
		req.user = payload.user;
		next()
		// throw createError(403, 'Not Authorized')
	} catch (error) {
		throw error
	}
}

module.exports = authorization;