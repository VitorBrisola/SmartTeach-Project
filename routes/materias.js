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
	Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
		.sort({ date: 'desc' })
		.then(materiais => {
			
			res.render('materias/index', {
				materia: req.params.materia,
				materiais: materiais
			});
		});

});

/* Add Material Form from a folder*/
router.get('/:nome/add', (req, res) => {
	nome = req.params.nome;
	res.redirect('/materiais/add/' + nome);
});

module.exports = router;