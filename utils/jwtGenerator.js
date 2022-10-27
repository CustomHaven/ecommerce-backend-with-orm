const jwt = require('jsonwebtoken');
const { TOKEN } = require('../config');

const jwtGenerator = (payload) => jwt.sign(payload, TOKEN, { expiresIn: "1h" });

module.exports = jwtGenerator;