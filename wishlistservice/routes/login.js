var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    req.session.user = req.body.username;
    res.redirect('/dashboard');

});
module.exports = router;
