const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Load Idea Model */
//require('../models/Materiais');
//const Material = mongoose.model('');

/* Schema that will be used for the User 
    User has a name, email, password.
*/
/* Create Schema */
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    /* User liked material */
    liked:
        [{
            type: String,
            required: true
        }]
    ,
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);