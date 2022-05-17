require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const router = express.Router();
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL);

app.use(cors(process.env.APP_URL));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json(
    { limit: '5mb' }
));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Alloe-Origin', '*');
    res.header('Access-Control-Alloe-Origin', 'Origin, X-Requested-with, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Alloe-Origin', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

const Ongs = require('./models/ongs');
const Incidents = require('./models/incidents');


const indexRoute = require('./routes/index-route');
const ongsRoute = require('./routes/ongs-route');
const incidentsRoute = require('./routes/incidents-route');



app.use('/', indexRoute);
app.use('/ongs', ongsRoute);
app.use('/incidents', incidentsRoute);

module.exports = app;