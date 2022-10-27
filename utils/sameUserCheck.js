const createError = require("http-errors");

const sameUserCheck = (user1, user2) => {

    if (user1.id !== user2 && user1.role !== "Administrator") {
        throw createError (401, "Unauthorized");
    } else if (user1.id !== user2) {
        if (user1.role === "Administrator") {
            return user1;
        }
        throw createError (401, "Unauthorized");
    }
    // return user1;
}

module.exports = sameUserCheck;

/*
{
  "email": "mmuseaden@gmail.com",
  "password": "noway"
}

{
    "email": "apilley2@intel.com"
    "password": "q9yADkK"
}

{
  "email": "string@string.com",
  "password": "string"
}
*/