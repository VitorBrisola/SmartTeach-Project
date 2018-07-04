const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/* Loading database connection*/
const conn = require('../app');

/* Load User Model */
require('../models/User');
const User = conn.model('users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado' });
            }
            /* Match password 
                password, user.password and a callback function
            */
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Senha incorreta' });
                }
            });
        });
    }));
    /* Passport cookie stuff */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}