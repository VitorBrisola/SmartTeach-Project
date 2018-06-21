const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// Create storage engine
const storage = new GridFsStorage({
	url: require('../config/database'),
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

module.exports = upload;