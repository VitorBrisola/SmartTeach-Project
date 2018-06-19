const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Loading database */
const db = require('../config/database').db;

/* Load the grid fs stream */
const gfs = require('../helpers/gfs');

/* Curly braces to only import some functions */
//const { ensureAuthenticated } = require('../helpers/auth');

/* Load Material Model */
require('../models/Material');
const Material = db.model('materiais');

/* MELHORAR ISSO FALTA COIOSAAAA */
/* Material index page */
router.get('/:materia', (req, res) => {
	Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
		.sort({ date: 'desc' })
		.then(materiais => {
			materiais.forEach(function (material) {
				//console.log(material.tipo);
				if (material.tipo == 'arquivo') {
					console.log(material.filename);
					/* COLOCAR EM MATERIAIS DOWNLAOD BURRR */
					gfs.files.findOne({ filename: material.filename }, (err, file) => {
						if (!file || file.length === 0) {
							return res.status(404).json({
							  err: 'No file exists'
							});
						}
						console.log('hello');						
						// Check if file
						if (file) {
							material.file = file;
						}else material.file = undefined;
					});
				}
			});

			console.log('hi');
			
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