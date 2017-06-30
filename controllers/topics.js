const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const topicsModel = require('../models/topics');

router.get('/', auth.restrict, (req, res) => {
    res.render('topics/index');
});

router.get('/insomnia', auth.restrict, (req, res) => {
    res.render('topics/insomnia')
})

module.exports = router;
