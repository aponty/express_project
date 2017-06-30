const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const eventsModel = {}

eventsModel.logEvent = (userEvent, id) => {
    return db.one("INSERT INTO action (user_id, topic_name, event_type, event_time) VALUES (${id}, 'insomnia', ${userEvent}, NOW()) returning user_id",
    { userEvent, id})
};

module.exports = eventsModel;
