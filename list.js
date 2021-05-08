const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema ({
    name: {type: String},
    store: {type: String},
    item: [],
    qty: {type: Number},
    estPrice: {type: Number},
    comments: [],
    date: {type: Date, default: Date.now}
},
    {timestamps: true});

const List = mongoose.model('List', listSchema);
module.exports = List;