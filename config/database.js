if(process.env.NODE_ENV === 'production'){
    module.exports = 'mongodb://leoMurtha:041097ll@ds147890.mlab.com:47890/videas';
}else{
	module.exports = 'mongodb://mongo:27017/smartteach-dev';
}

/* DOCKER URI mongodb://mongo:27017/smartteach-dev 
   LOCALHOST URI mongodb://127.0.0.1:27017/smartteach-dev
*/