const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const notesModel = {}

notesModel.pullAllByID= id => {
    return db.any('SELECT note, topic_name, event_time FROM users, main WHERE users.user_id = main.user_id AND main.user_id = ${id}', {id});
};

notesModel.addOne = (topic, note, user_id) => {
    return db.one('INSERT INTO main (user_id, topic_name, event_time, note) VALUES (${user_id}, ${topic}, NOW(), ${note}) RETURNING user_id', { topic, note, user_id })
}

notesModel.deleteOne = val => db.none('DELETE FROM main WHERE note = ${val}', {val});

module.exports = notesModel;
