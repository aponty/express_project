const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const eventsModel = {}

eventsModel.logEvent = (userEvent, id) => {
    return db.one("INSERT INTO actions (user_id, topic_name, event_type, event_time) VALUES (${id}, 'insomnia', ${userEvent}, NOW()) returning user_id",
    { userEvent, id })
};

eventsModel.addSleepData = (id, day, quality) => {
    return db.none("INSERT INTO sleep_records (user_id, day_of_year, quality) VALUES (${id}, ${day}, ${quality})",
    { id, day, quality })
}

eventsModel.getAllSleepData = id => {
    return db.any('SELECT * FROM sleep_records WHERE user_id = ${id}',
    { id }
)}
module.exports = eventsModel;
