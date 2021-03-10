require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const path = require('path');
const app = express();

// Starting Server
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

// Setting
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('src/assets'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Routes Print PDF
const printfMake = require('./routes/pdfmake');
app.use('/pdfMake', printfMake);

// Connect DB
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err))

app.listen(app.set('port'), () => {
    console.log(`app listening on port ${app.get('port')}!`)
})
