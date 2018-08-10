var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    req.db.collection('wishlist')
        .find({"user": req.session.user})
        .toArray(function (err, result) {
            console.log(result);
            res.render('dashboard', {
                user: req.session.user,
                allWishlists: !result ? [] : result.map(it => it._id)
            })
        });
});

module.exports = router;

