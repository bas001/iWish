var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    req.db.collection('wishlist')
        .find()
        .toArray(function (err, result) {
            res.render('dashboard', {
                user: req.session.user,
                allWishlists: !result ? [] : result
            })
        });
});

module.exports = router;

