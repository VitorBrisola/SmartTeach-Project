const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Curly braces to only import some functions */
//const { ensureAuthenticated } = require('../helpers/auth');

/* Load mongrid (mongo + gridfs) helper */
const mongrid = require('../helpers/mongrid');

/* Load Material Model */
require('../models/Material');
const Material = mongoose.model('materiais');

/* MELHORAR ISSO FALTA COIOSAAAA */
/* Material index page */
router.get('/:materia', (req, res) => {
	materiais = Material.find({ materia: req.params.materia }) // Searching for the materiais of the materia
		.sort({ date: 'desc' });

	console.log(materiais);
	
	res.render('materias/index', {
		materia: req.params.materia,
		materiais: materiais
	});
	/*
	gfs.files.find().toArray((err, files) => {
		// Check if files
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}

		// Files exist
		return res.json(files);
	});*/
});

/* Add Material Form from a folder*/
router.get('/:nome/add', (req, res) => {
	nome = req.params.nome;
	res.redirect('/materiais/add/' + nome);
});

module.exports = router;