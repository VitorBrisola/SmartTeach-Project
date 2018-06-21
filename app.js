const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');	

/* Map global promise - getting rid of warining */
mongoose.Promise = global.Promise;
/* Mongoose Middleware */
/* Connect to mongoose */
/* To work using docker use: mongodb://mongo:27017/smartteach-dev 
   To work using local host use mongodb://localhost:27017/smartteach-dev
*/
const mongoURI = require('./config/database');
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () =>{
	console.log('MongoDB Connected...');
	app.emit('ready');  
});

const app = express();


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

/* Download get is here because of the GFS problem */
app.get('/see/:materia-:filename', (req, res) => {
	// Read output to browser
	const readstream = gfs.createReadStream(req.params.filename);
	readstream.pipe(res);
});

/* process.env.PORT to deploy to heroku */
const port = process.env.PORT || 5001;

/* Load Routes */
app.on('ready', () => {
	app.listen(port, () => {
		/* back ticks work like format in python 3 */
		console.log(`Server started on port ${port}`);
	});
	const materias = require('./routes/materias');
	const materiais = require('./routes/materiais');

	/* Use Routes */
	app.use('/materias', materias);
	app.use('/materiais', materiais);

	// Init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
});

module.exports = conn;