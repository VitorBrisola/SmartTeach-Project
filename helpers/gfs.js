const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


/* Load database connection */
const connection = require('../config/database');

/* gsf const var, creates write and readstream */
const gfs = Grid(connection.db,mongoose.mongo);
gfs.collection('uploads');

module.exports = gfs;