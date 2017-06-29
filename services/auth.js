const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const passportInstance = passport.initialize();
const passportSession = passport.session();

function restrict(req, res, next) {
    console.log('in auth file is authenticated: ', req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((userObj, done) => {
    User
        .findByEmail(userObj.email)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('ERROR in deserializeUser:', err);
            done(null, false);
        });
});

passport.use(
    'local-signup',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .create(req.body.user)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('ERROR:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .findByEmail(email)
                .then((user) => {
                    if (user) {
                        const isAuthed = bcrypt.compareSync(password, user.password_digest);
                        console.log('is Authed:');
                        console.log(isAuthed)
                        if (isAuthed) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);


module.exports = { passportInstance, passportSession, restrict };
