const sinon = require('sinon');
const { NextFunction, Request, Response } = require("express");
const jwt = require('jsonwebtoken');
const { TOKEN } = require("../../config")

const customError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
const fakeId = "user-34242"
const id = 'user-1'
const userData = {
  email: 'testface@test.com',
  password: '123456',
  is_admin: false,
  first_name: 'Testy',
  last_name: 'McTestface',
}

const updatedUser = {
  id: 'user-1',
  email: 'testface@test.com',
  password: '123456',
  is_admin: false,
  first_name: 'Testy',
  last_name: 'McTestface', 
  google_id: null,
  facebook_id: null,
  created_at: "2020-06-26T09:31:36.630Z",
  updated_at: "2020-06-26T09:31:49.627Z"
}

const adminUser = {
  id: 'user-2',
  email: 'adminface@test.com',
  password: '123456',
  is_admin: true,
  first_name: 'john',
  last_name: 'doe', 
  google_id: null,
  facebook_id: null,
  created_at: "2020-06-26T09:31:36.630Z",
  updated_at: "2020-06-26T09:31:49.627Z"
}

const createAccessToken = (payload) => jwt.sign(payload, TOKEN, {expiresIn: "1h"});


let loginDetail = {
  email: "admin@test.com",
  password: "123456"
};

let loginAdminUser = {
  id: 1,
  email: "admin@test.com",
  password: "123456",
  is_admin: true
}

const loginUser = {
  id: 1,
  email: "admin@test.com",
  password: "123456",
  is_admin: true
}

const allUsers = [
  {
    id: 'user-1',
    email: 'testface@test.com',
    password: '123456',
    is_admin: false,
    first_name: 'Testy',
    last_name: 'McTestface', 
    google_id: null,
    facebook_id: null,
    created_at: "2021-10-19T09:31:36.630Z",
    updated_at: "2021-10-19T09:31:49.627Z"
  },
  {
    id: 'user-2',
    email: 'testface2@test.com',
    password: 'qwerty',
    is_admin: false,
    first_name: 'Testy2',
    last_name: 'McTestface2', 
    google_id: null,
    facebook_id: null,
    created_at: "2021-10-20T09:31:36.630Z",
    updated_at: "2021-10-20T09:31:49.627Z"
  },
  {
    id: 'user-3',
    email: 'testface3@test.com',
    password: 'mnbvcx',
    is_admin: false,
    first_name: 'Testy3',
    last_name: 'McTestface3', 
    google_id: null,
    facebook_id: null,
    created_at: "2021-10-20T09:31:36.630Z",
    updated_at: "2021-10-20T09:31:49.627Z"
  },
  {
    id: 'user-4',
    email: 'testface4@test.com',
    password: 'poiuyt',
    is_admin: true,
    first_name: 'Testy4',
    last_name: 'McTestface4', 
    google_id: null,
    facebook_id: null,
    created_at: "2021-10-20T09:31:36.630Z",
    updated_at: "2021-10-20T09:31:49.627Z"
  }
]

module.exports = {
  createAccessToken,
  customError,
  adminUser,
  fakeId,
  id,
  userData,
  updatedUser,
  allUsers,
  loginDetail,
  loginAdminUser,
  loginUser
}