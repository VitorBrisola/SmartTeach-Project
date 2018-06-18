const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
/* Load database connection */
const connection = require('../config/database');

/* Curly braces to only import some functions */
//const { ensureAuthenticated } = require('../helpers/auth');


/* Load Material Model */
require('../models/Material');
const Material = connection.db.model('materiais');

/* MELHORAR ISSO FALTA COIOSAAAA */
/* Material index page */
router.get('/:materia', (req, res) => {
	console.log('entered');
	Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
		.sort({ date: 'desc' })
		.then(materiais => {
			console.log('uashdhusad');
			materiais.forEach(function (material) {
				
				console.log(material);
			
				connection.gfs.files.findOne({ filename: material.filename }, (err, file) => {
					// Check if file
					if (!file || file.length === 0) {
						return res.status(404).json({
							err: 'No file exists'
						});
					}
					material.file = file;
				});
				
			});
			res.json(materiais);
			/*res.render('materias/index', {
				materia: req.params.materia,
				materiais: materiais
			});*/
		});

	console.log('ausduhsadhuashdu');
});

/* Add Material Form from a folder*/
router.get('/:nome/add', (req, res) => {
	nome = req.params.nome;
	res.redirect('/materiais/add/' + nome);
});

module.exports = router;