const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

/* Init gfs */
let gfs;

mongoose.connection.once('open', () => {
	// Init stream
	gfs = Grid(mongoose.connection.db, mongoose.mongo);
	gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
	url: 'mongodb://127.0.0.1:27017/smartteach-dev',
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

module.exports = {upload: upload, gfs: gfs};