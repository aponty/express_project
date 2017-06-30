const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const notesModel = require('../models/notes');


router.get('/new', auth.restrict, (req, res) => res.render('notes/new'));

router.get('/', auth.restrict, (req, res) => {
    notesModel
        .pullAllByID(req.user.user_id)
        .then(data => {
            res.render('notes/index', {data})
        })
});

router.delete('/', auth.restrict, (req, res) => {
    notesModel
        .deleteOne(req.body.val)
        .then(data => res.send('done'))
        .catch(bug => console.log(bug))
} )

router.post('/', auth.restrict, (req, res) => {
    notesModel
        .addOne(req.body.topic, req.body.note, req.user.user_id)
        .then(data => res.json(data))
        .catch(bug => console.log(bug))
})

module.exports = router;
