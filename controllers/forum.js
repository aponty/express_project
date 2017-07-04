const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const forumModel = require('../models/forum');
const moment = require('moment')


router.get('/', auth.restrict, (req, res) => {
    const topic = "insomnia";
    forumModel
        .pullAllByTopic(topic)
        .then(data => {
            data.forEach(x=> x.event_time = moment(x.event_time).format('MMM DD ha'))
            // res.send(data)
            res.render('forum/index', { data })
        })
})

router.post('/', auth.restrict, (req, res) => {
    const topic = req.body.topic;
    const comment = req.body.comment;
    const user = req.user.user_id

    forumModel
        .addOne(user, topic, comment)
        .then(data => res.send(data))
})

module.exports = router;
