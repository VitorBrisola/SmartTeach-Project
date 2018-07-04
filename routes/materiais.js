const express = require('express');
const router = express.Router();

/* Curly braces to only import some functions */
const { ensureAuthenticated } = require('../helpers/auth');

/* Loading db connection */
const conn = require('../app');

/* Load Material Model */
require('../models/Material');
const Material = conn.model('materiais');

/* Loading upload helper */
const upload = require('../helpers/upload');

/* Add Material Form from a folder*/
router.get('/add/:materia', ensureAuthenticated, (req, res) => {
	res.render('materiais/add', {
		materias: req.materias,
		materia: req.params.nome
	});
});

/* Process Form and Validation */
router.post('/', ensureAuthenticated, upload.single('file'), (req, res) => {
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
	} else {
		if (req.body.tipo == 'arquivo' && !req.file.filename) {
			errors.push({ text: 'Selecione um arquivo para ser enviado' });
		} else if (req.body.tipo == 'link' && !req.body.link) {
			errors.push({ text: 'Indique um link para o material' });
		}
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
			link: link,
			user: req.user.id
		};

		/* Saving it to the mongo database */
		new Material(newMaterial)
			.save()
			.then(idea => {
				req.flash('success_msg', 'Parabéns ' + req.user.name + ' seu material adicionado a pasta de ' + newMaterial.materia);
				res.redirect('/materias/' + newMaterial.materia);
			});
	}

});

/* Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	Material.findOne({
		_id: req.params.id
	})
		.then(material => {
			if (material.user != req.user.id) {
				req.flash('error_msg', 'Não Autorizado')
				res.redirect('/' + material.materia);
			} else {
				res.render('materiais/edit', {
					name: material.name,
					desc: material.desc,
					materia: material.materia,
					tipo: material.tipo,
					filename: material.filename,
					link: material.link,
				});
			}
		});
});


 Edit Form Process 
router.put('/:id', ensureAuthenticated, (req, res) => {
	Idea.findOne({
		_id: req.params.id
	})
		.then(idea => {
			// new values
			name = req.body.name;
			desc = req.body.desc;
			materia = req.body.materia;
			tipo = req.body.tipo;
			filename = filename;
			link = link;

			material.save()
				.then(idea => {
					req.flash('success_msg', 'Video idea updated');
					res.redirect('/materias/' + material.materia);
				})
		});
}); */

/* Delete idea */
router.delete('/:id', ensureAuthenticated, (req, res) => {
	Material.remove({ _id: req.params.id })
		.then(() => {
			req.flash('success_msg', 'Material removido com sucesso');
			res.redirect('/users/mymaterials');
		});
});

module.exports = router;