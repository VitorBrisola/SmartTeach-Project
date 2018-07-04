const express = require('express');
const router = express.Router();

/* Loading database connection*/
const conn = require('../app');

/* Curly braces to only import some functions */
//const { ensureAuthenticated } = require('../helpers/auth');

/* Load Material Model */
require('../models/Material');
const Material = conn.model('materiais');

/* Material index page */
router.get('/:materia', (req, res) => {
	var noMatch = null;
	if (req.query.search) {

		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Material.find({ materia: req.params.materia, name: regex }) // Searching for the materiais of the materia
			.sort({ date: 'desc' })
			.then(materiais => {
				if (materiais.length < 1) {
					noMatch = "Nenhum material com essa busca";
					res.render('materias/index', {
						materia: req.params.materia,
					});
				} else {
					/* See if user liked or not the material */
					materiais.forEach(material => {
						/* Always true because of not signed in users */
						material.liked = true;
						if (req.user) {
							material.liked = material.likers.includes(req.user.id);
						}
						material.likes = material.likers.length;
					});
					res.render('materias/index', {
						materia: req.params.materia,
						materiais: materiais
					});
				}
			});
	} else {
		Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
			.sort({ date: 'desc' })
			.then(materiais => {
				/* See if user liked or not the material */
				materiais.forEach(material => {
					/* Always true because of not signed in users */
					material.liked = true;
					if (req.user) {
						material.liked = material.likers.includes(req.user.id);
					}
					material.likes = material.likers.length;
				});

				res.render('materias/index', {
					materia: req.params.materia,
					materiais: materiais
				});
			});
	}
});


/* Add Material Form from a folder*/
router.get('/:nome/add', (req, res) => {
	nome = req.params.nome;
	res.redirect('/materiais/add/' + nome);
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;