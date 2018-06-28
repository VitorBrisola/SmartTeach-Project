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
					noMatch = "No campgrounds match that query, please try again.";
				}
				res.render('materias/index', {
					materia: req.params.materia,
					materiais: materiais
				});
			});

	} else {
		// Get all campgrounds from DB
		Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
			.sort({ date: 'desc' })
			.then(materiais => {
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