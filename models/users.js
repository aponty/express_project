const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const userModel = {}

userModel.create = user => {
    const password = bcrypt.hashSync(user.password, 10);

    return db.oneOrNone(`
    INSERT INTO users
    (email, password_digest, first_login)
    VALUES
    ($1, $2, NOW())
    RETURNING *;`, [user.email, password]);
};

userModel.findByEmail = email => {
    return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE email = $1;`, [email]);
};

userModel.addTopicToUser = (email, topic) => {
    return db.any("UPDATE users SET topics = ${topic} WHERE email = ${email}", { email, topic })
}

module.exports = userModel;
