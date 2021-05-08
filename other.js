const express = require('express');
const router = express.Router();
const List = require('../models/list.js');

router.get('/', (req, res) => {
    res.render('newOther.ejs')
})

router.post('/', (req,res) => {
    List.create(req.body, (error, createdList) => {
        res.redirect('/');
        data: createdList;
    })
})


module.exports = router;