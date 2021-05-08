const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = 3000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

//CONTROLLERS
const drugController = require('./controllers/drug.js');
app.use('/new-drugstore', drugController)
const groceryController = require('./controllers/grocery.js');
app.use('/new-grocery', groceryController)
// const otherController = require('./controllers/other.js');
// app.use('/new-other', otherController)
const targetController = require('./controllers/target.js');
app.use('/new-target', targetController)
//REQUIRE SCHEMA
const List = require('./models/list.js');
const seed = require('./models/seed.js');

//seed data
app.get('/seedList', (req, res) => {
    List.create(seed, (error, createdList) => {
        console.log(createdList);
        res.redirect('/');
        data: createdList;
    })
})

//index route
app.get('/', (req, res) => {
    List.find({}, (error, allData) => {
    res.render('index.ejs', {
        data: allData
        })
    })
})

// show route
app.get('/:id', (req, res) => {
    List.findById(req.params.id, (err, getList) => {
        console.log(getList)
        res.render('show.ejs', {
            data: getList
        })
    })
})

//update route
app.get('/:id/edit', (req, res) => {
    console.log('edit route working')
    List.findById(req.params.id, (err, foundList) => {
        // console.log(foundList[req.params.id])
        res.render('edit.ejs', {data: foundList})
    })
})
app.put('/:id', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true},
        (err, updatedModel) => {
            console.log(updatedModel)
            res.redirect('/')
        })
})

//delete route
app.delete('/:id', (req, res) => {
    //remove the item from the array
    List.findByIdAndDelete(req.params.id).then(res.redirect('/'));
})


app.listen(port, () => {
    console.log('listening on port: ', port);
  });

mongoose.connect('mongodb://localhost:27017/list', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});