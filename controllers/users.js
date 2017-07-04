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

//adds topics to users
router.put('/addusertopic', auth.restrict, (req, res) => {
    userModel
        .addTopicToUser(req.user.email, req.body.topic)
        .then(data => res.json(data))
        .catch(bug => console.log('addusertopic', bug))
})

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
            //make x lables
            resData.thisWeek = makeChartXLables()
            //get user data
            const eatingTimes = [];
            const mediTimes = [];
            const exerciseTimes = [];
            actions.forEach(el => {
                if (el.event_type === 'exercise') exerciseTimes.push(moment(el.event_time).dayOfYear());
                if (el.event_type === 'meditate') mediTimes.push(moment(el.event_time).dayOfYear());
                if (el.event_type === 'eating') eatingTimes.push(moment(el.event_time));
            })
            //format user data
            resData.meditate = makeChartArray(pastWeek(), mediTimes, 2)
            resData.exercise = makeChartArray(pastWeek(), exerciseTimes, 3)
            resData.eating = makeChartArray(pastWeek(), eatingTimesFilter(eatingTimes), 1)

            res.render('users/profile', { resData })
        })
        .catch(bug => console.log('/profile/get', bug));
});

const pastWeek = () => {
    let today = moment().dayOfYear();
    let lastWeek = [ today ];
    for (var i = 0; i < 6; i++) {
        lastWeek.push(lastWeek[i] - 1);
    };
    lastWeek = lastWeek.reverse();
    return lastWeek;
}

const makeChartXLables = () => {
    //generates past week, changes format and puts each el in an obj for mustache
    let thisWeek = pastWeek();
    thisWeek = thisWeek.map(el => y = { label: moment().dayOfYear(el).format('MMM DD').toString() });
    return thisWeek;
}

const makeChartArray = (week, userData, resInd) => week.map(el =>
    //returns array of needed num for chart.js or NaN if there's an elem at that date in db
    //not sure why this formation is necessary, but => { data } didn't work
    x = { elem: userData.indexOf(el) !== -1 ? resInd : NaN }
);

const eatingTimesFilter = arr => {
    //sorts by milliseconds, removes entries past 11 o'clock, passes 'true' days to makeChartArray for filtering by present week's date
    arr.sort((a, b) => a.valueOf() - b.valueOf());
    arr = arr.map(x => x.hour() < 23 ? x : NaN);
    arr = arr.map(x => isNaN(x) ? NaN : x.dayOfYear());
    return arr
};

module.exports = router
