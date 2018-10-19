var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    req.db.collection('wishlist')
        .find()
        .toArray(function (err, result) {
            let yours = [];
            let others = [];
            if (result) {
                result.forEach(function (wishlist) {
                    if (wishlist.user === req.session.user) {
                        yours.push(wishlist);
                    } else {
                        others.push(wishlist);
                    }
                })
            }
            res.render('dashboard', {
                user: req.session.user,
                yourWishlists: yours,
                otherWishlists: others
            })
        });
});

module.exports = router;

