const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Curly braces to only import some functions */
//const { ensureAuthenticated } = require('../helpers/auth');

/* Load Material Model */
require('../models/Material');
const Material = mongoose.model('materiais');

/* Material index page */
router.get('/:materia',  (req, res) => {
    res.render('materiais/index', {
        materia: req.params.materia
    });
});

/* Add Material Form 
router.get('/add',  (req, res) => {
	res.render('materiais/add');
});

 Edit Idea Form
router.get('/edit/:id',  (req, res) => {
	Idea.findOne({
		_id: req.params.id
	})
		.then(idea => {
			if (idea.user != req.user.id) {
				req.flash('error_msg', 'Not Authorized')
				res.redirect('/ideas');
			} else {
				res.render('ideas/edit', {
					idea: idea
				});
			}
		});
});*/

/* Process Form and Validation 
router.post('/', (req, res) => {
	let errors = [];

	if (!req.body.title) {
		errors.push({ text: 'Please add a title' });
	}

	if (!req.body.details) {
		errors.push({ text: 'Please add a details' });
	}

	if (errors.length > 0) {
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		const newIdea = {
			title: req.body.title,
			details: req.body.details,
			user: req.user.id
		};

		new Idea(newIdea)
			.save()
			.then(idea => {
				req.flash('success_msg', 'Video idea added');
				res.redirect('/');
			});
	}

});*/

/* Edit Form Process 
router.put('/:id', (req, res) => {
	Idea.findOne({
		_id: req.params.id
	})
		.then(idea => {
			// new values
			idea.title = req.body.title;
			idea.details = req.body.details;

			idea.save()
				.then(idea => {
					req.flash('success_msg', 'Video idea updated');
					res.redirect('/');
				})
		});
});*/

/* Delete idea 
router.delete('/:id', (req, res) => {
	Idea.remove({ _id: req.params.id })
		.then(() => {
			req.flash('success_msg', 'Video idea removed');
			res.redirect('/');
		});
});*/

module.exports = router;