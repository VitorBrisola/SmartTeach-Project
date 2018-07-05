if(process.env.NODE_ENV === 'production'){
    module.exports = 'mongodb://admin:admin$1@ds127811.mlab.com:27811/smartteach';
}else{
	module.exports = 'mongodb://admin:admin$1@ds127811.mlab.com:27811/smartteach';
}

/* DOCKER URI mongodb://mongo:27017/smartteach-dev 
   LOCALHOST URI mongodb://127.0.0.1:27017/smartteach-dev
*/