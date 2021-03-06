var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.session.user = "";
    res.render('login');
});

router.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    req.db.collection("users").findOne({"name": username}, function (err, user) {
        if (user && user.password === password) {
            req.session.user = username;
            res.redirect('/dashboard');

        } else {
            res.render('login', {
                error: "The username or password is incorrect."
            })
        }
    });


});
module.exports = router;
