const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const eventsModel = require('../models/events');

router.post('/', auth.restrict, (req, res) => {
    eventsModel
        .logEvent(req.body.data, req.user.user_id)
        .then(data => res.json(data))
        .catch(bug => console.log(bug))
});

module.exports = router;
