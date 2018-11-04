var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('signup');
});

router.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    req.db.collection("users").findOne({"name": username}, function (err, user) {

        if(user) {
            res.render('signup', {
                error: 'User ' + username + ' ' +  'already exists. Please choose another username.'
            });
        } else {
            req.db.collection("users").insert({"name": username, "password": password}, function (err, user) {
                req.session.user = username;
            });
            req.db.collection("wishlist").insert(
                {"items": [], "user": username},
                function (err, wishlist) {
                    if (err) throw err;
                    console.log("1 wishlist added" + wishlist.insertedIds[0]);
                    res.redirect('/dashboard');

                });

        }

    });



});
module.exports = router;
