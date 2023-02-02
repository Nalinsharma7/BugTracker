require('dotenv').config();
const express = require('express');

// const db = require('./config/mongoose');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./routes'));

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
  console.log('Connected to mongo')
})
mongoose.connection.on('error',(err)=>{
  console.log('Error in connecting to mongo',err)
})
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
