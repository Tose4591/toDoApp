const express = require('express');
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Notes = require('./models/note')

mongoose.connect('mongodb://localhost:27017/notesapp')
  .then(() => {
    console.log("mongo connection succesful");
  })
  .catch(err => {
    console.log("mongo connection error");
    console.log(err);
  })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  notes = await Notes.find({});
  res.render('home', { notes })
})

app.post('/notes', async (req, res) => {
  const newNote = new Notes(req.body.note);
  await newNote.save();
  res.redirect('/');
})

app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Notes.findById(id);
  res.render('edit', { note });
})

app.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Notes.findByIdAndUpdate(id, req.body.note, { runValidators: true });
  res.redirect('/');
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Notes.findByIdAndDelete(id);
  res.redirect('/');
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})