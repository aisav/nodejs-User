var User = require('../models/user');

var config = require('../../config');

var s = config.secretKey;

module.exports = function(app, express){
    var api = express.Router();

    api.post('/signup', function(req, res){
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        user.save(function(err){
            if(err){
            console.log("==============================This is Error==================");
            console.log(err);
                res.send(err);
            }
            res.json({message: 'user has been created'});
        });
    });

    api.get('/users', function(req, res){

        User.find({}, function(err, users){
            if(err){
                res.send(err);
                return;
            }
            res.json(users)
        });
    });

    api.post('/signup', function(req, res){

        User.findOne({
            username: req.body.username
        }, function(err, user){
             if(err){
                res.send(err);
                return;
            }
            res.json(user)
        });
        });
    

    return api;
}
