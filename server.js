//importing js files and assignes them to vars
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(config.database, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Connected to the database");        
    }
});

//for parsing any URL, false for only string
app.use(bodyParser.urlencoded({ extended: true}));
//for json
app.use(bodyParser.json());
//log any request in the console
app.use(morgan('dev'));

// all files render under public dir
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);
//prefix URL
app.use('/api',api);

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Listening on port 3000");        
    }
});