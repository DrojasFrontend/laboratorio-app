const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaboSchema = new Schema({
    name: String,
    lastname: String,
    date: String,
    phone: Number,
    doctora: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('laboratorio', LaboSchema);

