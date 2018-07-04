const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema that will be used for the Material 
    Material has a name and type.
*/
/* Create Schema */
const MaterialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    /* Crypto filename from gridfs */
    filename: {
        type: String
    },
    link: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    /* Saves who liked the post */
    /* Get the num of likes is equal to get the num of likers */
    likers:
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

mongoose.model('materiais', MaterialSchema);