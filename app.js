const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const db = require('./config/database');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

/* Load Routes */
const materias = require('./routes/materias');
const materiais = require('./routes/materiais');

/* Load Routes 
const ideas = require('./routes/ideas');
const users = require('./routes/users');
*/

/* Handlebars Middleware*/
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

/* Body parser Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Static Folder, Path middleware */
/* Sets the public folder as the express static */
app.use(express.static(path.join(__dirname, 'public')));

/* Method override Middleware */
app.use(methodOverride('_method'));

/* Session Middleware */
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/* Passport middleware
app.use(passport.initialize());
app.use(passport.session());
*/

/* Flash Middleware */
app.use(flash());

/* Global Variables */
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.materias = req.materias = [{ name: 'Calculo', image: '/img/calculoIcon.png', url: '/materias/Calculo' },
	{ name: 'Geometria Analitica', image: '/img/estatisticaIcon.png', url: '/materias/GeometriaAnalitica' },
	{ name: 'Computação', image: '/img/computacaoIcon.png', url: '/materias/Computacao' },
	{ name: 'Estatística', image: '/img/estatisticaIcon.png', url: '/materias/Estatistica' },
	{ name: 'Física', image: '/img/estatisticaIcon.png', url: '/materias/Fisica' },
	{ name: 'Química', image: '/img/estatisticaIcon.png', url: '/materias/Quimica' }]
	next();
});

/* Index Route:
	req = request stuff
	res = response stuff
*/
app.get('/', (req, res) => {
	const title = 'Welcome';
	res.render('index', {
		title: title,
		materia: res.locals.materias
	});
});

/* process.env.PORT to deploy to heroku */
const port = process.env.PORT || 5000;

app.listen(port, () => {
	/* back ticks work like format in python 3 */
	console.log(`Server started on port ${port}`);
});


/* Use Routes */
app.use('/materias', materias);
app.use('/materiais', materiais);