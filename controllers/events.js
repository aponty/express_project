const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const eventsModel = require('../models/events');
const api = require('../services/api')
const util = require('util')
const moment = require('moment');

router.post('/', auth.restrict, (req, res) => {
    eventsModel
        .logEvent(req.body.data, req.user.user_id)
        .then(data => res.json(data))
        .catch(bug => console.log(bug))
});

router.get('/', auth.restrict, (req, res) => {
    const id = req.user.user_id
    api
        .getSleepData(id)
        .then(data => {
            //This would be the part where I parse out the users sleep data score by date
            //right now it's adding it to the db over and over again. With Oauth there'd be an authenticate step, so I could just do it once then
            //then load just today's every page hit. There will still be repeated lines, but thats only a (very minor) efficiency concern
            const sleepData = data.data.extractorData.data[0].group[0]['New column'][0].text.split(',').map(el => parseFloat(el));
            const sleepDates = pastWeek()
            //this doesn't work very well. They all fire at once and the return isn't always the last one. Everything gets added to the db, but
            //it doesn't always render the full return
            sleepData.forEach((record, ind) => eventsModel.addSleepData(id, sleepDates[ind], record))
        })
        .then(data => {
            return eventsModel.getAllSleepData(id)
        })
        .then(data => {
            const resData = {}
            console.log(data)
            data.slice(-7).forEach(x => resData[moment().dayOfYear(x.day_of_year).format('MMM DD').toString()] = x.quality)
            console.log(resData)
            res.json(resData)
        })
})

//yes, yes, don't repeate yourself. However, this is only needed because my filler data isn't actually associated to real dates. So it's temporary
const pastWeek = () => {
    let today = moment().dayOfYear();
    let lastWeek = [ today ];
    for (var i = 0; i < 6; i++) {
        lastWeek.push(lastWeek[i] - 1);
    };
    lastWeek = lastWeek.reverse();
    return lastWeek;
}

module.exports = router;
