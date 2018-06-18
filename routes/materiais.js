const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

/* Load mongrid (mongo + gridfs) helper */
const mongrid = require('../helpers/mongrid');

/* Load Material Model */
require('../models/Material');
const Material = mongoose.model('materiais');

/* Add Material Form from a folder*/
router.get('/add/:materia',  (req, res) => {
	//console.log(req.materias);
	res.render('materiais/add', {
		materias : req.materias,
		materia: req.params.nome
	});	
});

/* Process Form and Validation */
router.post('/', mongrid.upload.single('file'), (req, res) => {
	//res.json({file: req.file});
	
	let errors = [], filename, link;

	/* Checking for missing fields */
	if (!req.body.name) {
		errors.push({ text: 'Adicione um nome' });
	}
	
	if (!req.body.desc) {
		errors.push({ text: 'Adicione uma descrição' });
	}

	if (!req.body.materia) {
		errors.push({ text: 'Vincule uma matéria ao material' });
	}

	if (!req.body.tipo) {
		errors.push({ text: 'Selecione o tipo do arquivo' });
	}

	/* If any errors respond with errors to user */
	if (errors.length > 0) {
		res.render('materiais/add', {
			errors: errors,
			name: req.body.name,
			desc: req.body.desc,
			materia: req.body.materia,
			tipo: req.body.tipo
		});
	} else {
		if (req.body.tipo == 'arquivo') {
			filename = req.file.filename;

        } else if (req.body.tipo == 'link') {
            link = req.body.link;
		}
		
		/* Creating a new material */
		const newMaterial = {
			name: req.body.name,
			desc: req.body.desc,
			materia: req.body.materia,
			tipo: req.body.tipo,
			filename: filename,
			link: link
		};
		
		/* Saving it to the mongo database */
		new Material(newMaterial)
			.save()
			.then(idea => {
				req.flash('success_msg', 'Material adicionado a pasta de ' + newMaterial.materia);
				res.redirect('/materias/' + newMaterial.materia);
			});
	}

});

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
});

/* Edit Idea Form
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