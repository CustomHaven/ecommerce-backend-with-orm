const Models = require('../models');
const bcrypt = require('bcryptjs');
const { User } = Models;
const createError = require("http-errors");
const sameUserCheck = require("../utils/sameUserCheck");

module.exports = class UserService {

  async findAllUsers() {
    try {
      const allUsers = await User.findAll();
      if (allUsers) {
        return allUsers
      }
      // return null
      throw createError(404, 'Invalid path');
    } catch (err) {
      throw err
    }
  }

  async findOneUser(id) {
    try {
      const user = await User.findOne({ where: { id: id } }); // if null is returned error is thrown

      if (!user) {
        throw createError(404, 'User not found');
      }
      // return null
      return user;
    } catch (err) {
      throw err
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email }});
      if (user) {
        return user;
      }
      throw new createError(404, "User not found");
    } catch (err) {
      err.code = 404;
      throw err
    }
  }

  async updateUser(id, data) {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash;
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw createError(404, 'User not Found') // find out how to include this without makinng the test fail
        // return null // test works for null case SO i wanted the error case instead
      }
      return await user.update(data)
    } catch (err) {
      throw err
    }
  }

  async addUser(data) {
    try{
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
      const user = await User.create(data);
      if (!user) {
        // return null;
        throw createError(409, 'Could not make a new user');
      }
      return user;
    } catch(err) {
      throw err;
    }
  }
  
  async findByPrimaryKey(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw createError(404, 'User not found');
      }
      return user;
    } catch (err) {
      throw err
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.destroy({ where: { id: id } }); // if user is deleted returns 1 if user is not found returns 0!!
      if (!user) {
        // return null
        throw createError(404, 'User not found');
      }
      return user; // is 1 as we delete 1
    } catch (err) {
      throw err
    }
  }
}