const jwt = require('jsonwebtoken');
const { TOKEN } = require('../config');

const jwtGenerator = (payload, secretKey, time) => jwt.sign(payload, secretKey === "access" ? TOKEN.ACCESS_TOKEN : TOKEN.REFRESH_TOKEN, { expiresIn: time });

module.exports = jwtGenerator;