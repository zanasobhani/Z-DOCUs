

const mongoose = require('mongoose');
const { type } = require('os');

const docSchema = new mongoose.Schema({
    contentDoc: {
        type: String
    }
    ,
    imageDoc:{
        type:String
    }
});

const contentDoc = mongoose.model('textDoc', docSchema);


module.exports = contentDoc;
