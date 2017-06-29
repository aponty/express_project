const userModel = require('../models/users');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');

//user profile page on post to login form
router.post(
    '/',
    passport.authenticate(
        'local-signup', {
            failureRedirect: '/new',
            successRedirect: '/profile'
        }
    )
);

//render new user page
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
        userModel
            .findByEmail(req.user.email)
            .then(user => {
                res.render(
                    'users/profile', {
                        user: user
                    }
                );
            })
            .catch(err => console.log('/profile/get', err));
    }
);

router.put('/addusertopic', auth.restrict, (req, res) => {
        userModel
            .addTopicToUser(req.user.email, req.body.topic)
            .then(data => res.json(data))
            .catch(bug => console.log(bug))
    }
)

module.exports = router;
