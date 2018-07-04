const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const Types = require('mongoose').Types;

/* Loading database connection*/
const conn = require('../app');

/* Load User Model */
require('../models/User');
const User = conn.model('users');

/* Load Material Model */
require('../models/Material');
const Material = conn.model('materiais');

/* Curly braces to only import some functions */
const { ensureAuthenticated } = require('../helpers/auth');

/* User Login Route */
router.get('/login', (req, res) => {
    res.render('users/login');
});

/* User Register Route */
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get('/mymaterials', ensureAuthenticated, (req, res) => {
    Material.find({ user: req.user.id }) // Searching for the materiais of the materia
        .sort({ date: 'desc' })
        .then(materiais => {
            res.render('users/mymaterials', {
                materiais: materiais
            });
        });
});

router.get('/liked', ensureAuthenticated, (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
        /* Searching for liked materials */
        Material.find({
            _id:
            {
                "$in": [user.liked]
            }
        }) // Searching for the materiais of the materia
            .sort({ date: 'desc' })
            .then(materiais => {
                res.render('users/liked', {
                    materiais: materiais
                });
            });
    });


});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

/* Register form POST */
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({ text: 'Senhas não são iguais' });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: 'Senhas precisam ter comprimento mínimo de 4' });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2,
        });
    } else {
        /* Checking for the same email */
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'E-mail já cadastrado');
                    res.redirect('/users/register');
                } else {

                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(User => {
                                    req.flash('success_msg', 'Você está registrado, agora você consegue logar');
                                    res.redirect('/');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });

                        });
                    });
                }
            });
    }
});

/* Logging out user */
router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success_msg', 'Saiu com sucesso')
    res.redirect('/users/login');
});

module.exports = router;