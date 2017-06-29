const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const topicsModel = {}

topicsModel.pullAll = () => {


    return db.oneOrNone(`
    INSERT INTO users
    (email, password_digest)
    VALUES
    ($1, $2)
    RETURNING *;`, [user.email, password]);
};

module.exports = topicsModel;
