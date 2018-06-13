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
    materia: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('materiais', MaterialSchema);