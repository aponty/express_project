const userModel = require('../models/users');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const moment = require('moment');

//handles new user form
router.post('/',
    passport.authenticate(
        'local-signup', {
            failureRedirect: '/new',
            successRedirect: '/profile'
        }
    )
);

//render new user form page
router.get('/new', (req, res) => {
    res.render('users/new');
});

//user logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

//handle user login request
router.post(
    '/login',
    passport.authenticate(
        'local-login', {
            failureRedirect: '/',
            successRedirect: '/profile'
        }
    )
);















//handles profile get requests
router.get('/profile', auth.restrict, (req, res) => {
    const resData = {};
    userModel
        .findByEmail(req.user.email)
        .then(user => {
            resData.user = user;
            return userModel.pullActions(req.user.user_id)
        })
        .then(actions => {
            //this makes the x-axis lables, adds to array for mustache
            //there has to be a better way to do it but I'm tired of fussing with moment
            let today = moment().dayOfYear();
            resData.thisWeek = [ today ];
            for (var i = 0; i < 6; i++) {
                resData.thisWeek.push(resData.thisWeek[i] - 1)
            }
            resData.thisWeek = resData.thisWeek.reverse();
            resData.thisWeek = resData.thisWeek.map(el => y = { label : moment().dayOfYear(el).format('MMM DD dddd').toString() });


            console.log(resData.thisWeek)

            const eatingTimes = [];
            const mediTimes = [];
            const exerciseTimes = [];

            actions.forEach(el => {
                if (el.event_type === 'exercise') exerciseTimes.push(moment(el.event_time).dayOfYear());
                if (el.event_type === 'meditate') mediTimes.push(moment(el.event_time).dayOfYear());
                //this is the hard one
                if (el.event_type === 'eating') eatingTimes.push(moment(el.event_time));
            })

            resData.actions = actions;
            res.render('users/profile', { resData })
        })
        .catch(bug => console.log('/profile/get', bug));
});


// res.render('users/profile', { user })









//adds topics to users
router.put('/addusertopic', auth.restrict, (req, res) => {
    userModel
        .addTopicToUser(req.user.email, req.body.topic)
        .then(data => res.json(data))
        .catch(bug => console.log('addusertopic', bug))
})



















module.exports = router
