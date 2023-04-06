const createError = require("http-errors");

/**
 * 
 * @param {res.locals.userIdRole} user1 
 * @param {req.param.id} user2 
 * @returns null || 401 || ADMIN USER
 */

const sameUserCheck = (user1, user2) => {

    if (user1.id !== user2 && user1.role !== "Administrator") {
        throw createError(401, "Unauthorized");
    } else if (user1.id !== user2) {
        if (user1.role === "Administrator") {
            return user1;
        }
        throw createError(401, "Unauthorized");
    }
    // return user1;
}

module.exports = sameUserCheck;

/*
{
  "email": "my@email.com",
  "password": "no"
}

{
    "email": "apilley2@intel.com"
    "password": "no"
}

{
  "email": "string@string.com",
  "password": "no"
}
*/