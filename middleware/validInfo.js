const createError = require('http-errors');

module.exports = function(req, res, next) {
  const { email, password } = req.body;

  // console.log("are we here!? invalid info??", req.body);

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }



  if (/register/.test(req.path)) {

    if (![email, password].every(Boolean)) {
			throw createError(409, 'Missing Credentials');
    } else if (!validEmail(email)) {
			throw createError(409, 'Invalid Email');
    }

  } else if (/login/.test(req.path)) {

    if (![email, password].every(Boolean)) {
			throw createError(409, 'Missing Credentials');
    } else if (!validEmail(email)) {
			throw createError(409, 'Invalid Email');
    }

  } else if (/users\/user/.test(req.originalUrl)) {

    if (![email, password].some(Boolean)) {
			throw createError(409, 'Missing Credentials');

    }
    
    if (!email) {
      return next();
    } else if (!validEmail(email)) {
			throw createError(409, 'Invalid Email');
    }

  }

  next();
};