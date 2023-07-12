const Models = require('../models');
const bcrypt = require('bcryptjs');
const { User, ContactDetail, Role, RefreshToken } = Models;
const createError = require("http-errors");
const sameUserCheck = require("../utils/sameUserCheck");

module.exports = class UserService {

  static async createRefreshToken(userObj) {
    try {
      const refreshToken = await RefreshToken.createToken(userObj);
      if (!refreshToken) return null;
      return refreshToken;
    } catch (error) {
      throw error;
    }
  }

  static async tokenExpiration(token_id) {
    try {
      const token = await UserService.findToken(token_id);
      const expiryDate = RefreshToken.verifyExpiration(token); // token.expiry_date if future is greater than todays date we can create the token otherwise remove the token!

      if (!expiryDate) {
        await UserService.removeRefreshToken(token.token);
        throw createError(401, "Token Expired");
      }
      return expiryDate;
    } catch (error) {
      throw error;
    }
  }

  static async findToken(token_id) {
    try {
      const token = await RefreshToken.findOne({
        where: { token: token_id },
        attributes: { exclude: ["id", "created_at", "updated_at"] }
      });
      if (!token) {
        throw new createError(401, "Invalid token");
      };
      return token;
    } catch (error) {
      throw error;
    }
  }

  static async removeRefreshToken(token_id) {
    try {
      const token = await RefreshToken.destroy({ where: { token: token_id } }); // if token is deleted returns 1 if token is not found returns 0!!
      if (!token) {
        // return null
        throw createError(404, "Token not found");
      }
      return token; // is 1 as we delete 1
    } catch (error) {
      throw error;
    }
  }

  static async findGuestEmail(email) {
    try {
      const user = await User.findOne({
        where: { email: email },
        attributes: { exclude: ["created_at", "updated_at", "password"] }
      });
      if (!user) {
        return null
      }
      return user;
    } catch (err) {
      err.code = 404;
      throw err;
    }
  }

  static async findRole(name) {
    try {
      const role = await Role.findOne({
        where: { name: name },
        attributes: { exclude: ["created_at", "updated_at"] }
      });
      if (!role) {
        throw createError(400, 'Invalid role');
      }
      return role;
    } catch (error) {
      throw error;
    }
  }

  static async getUserAndUserContactDetails(id) {
    try {
      const user = await User.findByPk(
        id, {
          attributes: { exclude: ["created_at", "updated_at", "password"] },
          include: [
            {
              model: Role,
              attributes: { exclude: ["id", "created_at", "updated_at"] },
              through: { attributes: [] }
            },
            {
              model: ContactDetail,
              attributes: { exclude: ["created_at", "updated_at"] }
            }
          ]
        }
      );
      if (!user) {
        return null
      }
      return user;
    } catch (err) {
      err.code = 404;
      throw err
    }
  }

  async findAllUsers() {
    try {
      const allUsers = await User.findAll({
        attributes: { exclude: ["created_at", "updated_at", "password"] }
      });
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
      const user = await User.findOne({ 
        where: { id: id },
        attributes: { exclude: ["created_at", "updated_at", "password"] },
        include: {
          model: Role,
          attributes: { exclude: ["id", "created_at", "updated_at"] },
          through: { attributes: [] }
        }
      }); // if null is returned error is thrown

      if (!user) {
        throw createError(404, 'User not found');
      }
      // return null
      return user;
    } catch (err) {
      throw err
    }
  }

  async loginByEmail(email, password) {
    try {
      const user = await User.findOne({ 
        where: { email: email },
        attributes: { exclude: ["created_at", "updated_at"] },
        include: {
          model: Role,
          attributes: { exclude: ["id", "created_at", "updated_at"] },
          through: { attributes: [] }
        }
      });
      // console.log(user.password);
      if (!user) {
        throw new createError(404, "User not found");
      }
      if (user.is_guest) {
        return user;
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        throw createError(400, "Username or password is invalid");
      }
      return user;
    } catch (err) {
      err.code = 404;
      throw err
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ 
        where: { email: email },
        attributes: { exclude: ["created_at", "updated_at", "password"] },
        include: [
          {
            model: Role,
            attributes: { exclude: ["id", "created_at", "updated_at"] },
            through: { attributes: [] }
          },
          {
            model: ContactDetail,
            attributes: { exclude: ["id", "created_at", "updated_at"] },
          }
        ]
      });
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
      const user = await User.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at", "password"] }
      });
      if (!user) {
        throw createError(404, 'User not Found') // find out how to include this without makinng the test fail
        // return null // test works for null case SO i wanted the error case instead
      }
      return await user.update(data)
    } catch (err) {
      throw err
    }
  }

  async addGuest(data) {
    try{
      // const role = await UserService.findRole(data.roles);
      const lookUpUser = await UserService.findGuestEmail(data.email);
      if (lookUpUser) {
        return await UserService.getUserAndUserContactDetails(lookUpUser.id);
      }
      const user = await User.create(data);
      if (!user) {
        throw createError(409, "Could not make the new guest account");
      }

      const roles = await Promise.all(data.roles.map(async role => {
        return await UserService.findRole(role);
      }));

      await Promise.all(roles.map(async role => await user.addRole(role)))
      const findUser = await this.findByPrimaryKey(user.id);
      return findUser;
    } catch(err) {
      throw err;
    }
  }

  async addUser(data) {
    try{
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
      // const role = await UserService.findRole(data.role);

      const roles = await Promise.all(data.roles.map(async role => {
        return await UserService.findRole(role);
      }));

      const user = await User.create(data);
      if (!user) {
        // return null;
        throw createError(409, 'Could not make a new user');
      }
      await Promise.all(roles.map(async role => await user.addRole(role)))
      const findUser = await this.findByPrimaryKey(user.id);
      return findUser;
    } catch(err) {
      throw err;
    }
  }
  
  async findByPrimaryKey(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at", "password"] },
        include: [
          {
            model: Role,
            attributes: { exclude: ["id", "created_at", "updated_at"] },
            through: { attributes: [] }
          }
        ]
      });
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


/*

SELECT users.email AS email, roles.name AS rolename
FROM users
JOIN user_roles ON users.id = user_roles.user_id
JOIN roles ON roles.id = user_roles.role_id
WHERE users.id = 'user-9';

    */