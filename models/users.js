const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const userModel = {}
//hardcoding insomnia in here because I don't want to setup a check for adding a disease before
//allowing access to the notes
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

userModel.pullActions = id => {
    return db.any('SELECT * FROM actions WHERE user_id = ${id}', {id})
}


module.exports = userModel;
