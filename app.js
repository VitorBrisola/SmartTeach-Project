const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

/* Load Routes */
const materiais = require('./routes/materiais');

/* Load Routes 
const ideas = require('./routes/ideas');
const users = require('./routes/users');
*/

/* Passport Config 
require('./config/passport')(passport);
 DB configuration 
const db = require('./config/database');
*/

/* Map global promise - getting rid of warining */
mongoose.Promise = global.Promise;
/* Mongoose Middleware */
/* Connect to mongoose */
/* To work using docker use: mongodb://mongo:27017/smartteach-dev 
   To work using local host use mongodb://localhost:27017/smartteach-dev
*/
mongoose.connect('mongodb://127.0.0.1:27017/smartteach-dev')
	.then(() => console.log('Mongo DB Connected...'))
	.catch(err => console.log(err));

mongoose.connection.once('open', function() { 
		// All OK - fire (emit) a ready event. 
		app.emit('ready'); 
});

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
	/* !!!! Gambiarra tenho que criar as materias no DB !!!!!!!*/
	res.locals.materias = [{name: 'Calculo', id: 1, materias: [{text: 'Lista 3 Integrais'},{text: 'Resolução Lista 4 Integrais Triplas'}, {text: 'Prova 3 Calculo 3- Zani'}]} , 
						   {name: 'Geometria Analitica', id:2, materias: [{text: 'Parametrização'}]}];
	next();
});

/* Index Route:
	req = request stuff
	res = response stuff
*/
app.get('/', (req, res) => {
	const title = 'Welcome';
	console.log(path.join(__dirname, 'public'));
	res.render('index', {
		title: title,
		materias: [{name: 'Calculo',image: '/img/calculoIcon.png',url:'/materiais/Calculo'}, 
		{name: 'Geometria Analitica',image: '/img/estatisticaIcon.png',url:'/materiais/GeometriaAnalitica'},
		{name: 'Computacao',image: '/img/computacaoIcon.png',url:'/materiais/Computacao'},
		{name: 'Estatistica',image: '/img/estatisticaIcon.png',url:'/materiais/Estatistica'},
		{name: 'Fisica',image: '/img/estatisticaIcon.png',url:'/materiais/Fisica'},
		{name: 'Quimica',image: '/img/estatisticaIcon.png',url:'/materiais/Quimica'}]
	});
});

/* process.env.PORT to deploy to heroku */
const port = process.env.PORT || 5000;

/* */
app.on('ready', function() { 
    app.listen(port, () => {
		/* back ticks work like format in python 3 */
		console.log(`Server started on port ${port}`);
	});	 
}); 

/* Use Routes */
app.use('/materiais', materiais);
