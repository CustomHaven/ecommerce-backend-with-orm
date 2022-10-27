const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { TOKEN } = require('../config');

function authorization(req, res, next) {
	console.log('hello autho middleware')
	try {
		const jwtToken = req.header('token');
		console.log(jwtToken)
		// Check if there is a token
		if (!jwtToken) {
			throw createError(403, 'Authorization denied')
		}

		// Verify token
		const payload = jwt.verify(jwtToken, TOKEN);

		console.log(payload)

		req.user = payload.user;
		next()
		// throw createError(403, 'Not Authorized')
	} catch (error) {
		throw error
	}
}

module.exports = authorization;