const express = require('express');
const router = express.Router();
const List = require('../models/list.js');

router.get('/', (req, res) => {
    res.render('newDrug.ejs')
})

router.post('/', (req,res) => {
    List.create(req.body, (error, createdList) => {
        console.log(createdList);
        res.redirect('/');
        data: createdList;
    })
})

// router.get('/:id', (req, res) => {
//     List.findById(req.params.id, (err, getList) => {
//         console.log(getList)
//         res.render('show.ejs', {
//             data: getList
//         })
//     })
// })
// //update route
// router.get('/:id/edit', (req, res) => {
//     console.log('edit route working')
//     List.findById(req.params.id, (err, foundList) => {
//         // console.log(foundList[req.params.id])
//         res.render('edit.ejs', {data: foundList})
//     })
// })
// router.put('/:id', (req, res) => {
//     List.findByIdAndUpdate(req.params.id, req.body, {new: true},
//         (err, updatedModel) => {
//             console.log(updatedModel)
//             res.redirect('/')
//         })
// })

// //delete route
// router.delete('/:id', (req, res) => {
//     //remove the item from the array
//     List.findByIdAndDelete(req.params.id).then(res.redirect('/'));
// })

module.exports = router;