if(process.env.NODE_ENV === 'production'){
    module.exports = 'mongodb://leoMurtha:041097ll@ds147890.mlab.com:47890/videas';
}else{
	module.exports = 'mongodb://mongo:27017/smartteach-dev';
}