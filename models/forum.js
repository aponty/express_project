const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const forumModel = {}

forumModel.pullAllByTopic = topic => {
    return db.any('SELECT comment, event_time, email, comment_id FROM comments, users WHERE users.user_id = comments.user_id AND topic_name = ${topic}',
    { topic });
};

forumModel.addOne = (user, topic, comment) => {
    return db.one('INSERT INTO comments (user_id, topic_name, comment, event_time) VALUES (${user}, ${topic}, ${comment}, NOW()) RETURNING user_id',
    { topic, comment, user });
}

forumModel.deleteOne = val => db.none('DELETE FROM main WHERE note = ${val}', {val});

module.exports = forumModel;
