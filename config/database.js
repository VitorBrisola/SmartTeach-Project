if(process.env.NODE_ENV === 'production'){
    mongoURI = 'mongodb://leoMurtha:041097ll@ds147890.mlab.com:47890/videas';
}else{
    mongoURI = 'mongodb://localhost:27017/smartteach-dev';
}

const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

/* Map global promise - getting rid of warining */
mongoose.Promise = global.Promise;
/* Mongoose Middleware */
/* Connect to mongoose */
/* To work using docker use: mongodb://mongo:27017/smartteach-dev 
   To work using local host use mongodb://localhost:27017/smartteach-dev
*/
const db = mongoose.createConnection(mongoURI);
let _gfs;

db.once('open', () => {
	console.log('MongoDB Connected on ' + mongoURI);
	// Init stream
	_gfs = Grid(db.db, mongoose.mongo);
	_gfs.collection('uploads');
});

const gfs = _gfs;

// Create storage engine
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			/* Generates cript name */
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				/* Filename crypt + file extension */
				let materia;
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads',
					materia : materia
				};
				resolve(fileInfo);
			});
		});
	}
});
/* upload: use for uploading files to DB */
const upload = multer({ storage });

module.exports = {db: db,upload: upload, gfs: gfs};