var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    req.db.collection('wishlist')
        .find()
        .toArray(function (err, result) {
            let mine;
            let others = [];
            if (result) {
                result.forEach(function (wishlist) {
                    if (wishlist.user === req.session.user) {
                        mine = wishlist
                    } else {
                        others.push(wishlist);
                    }
                })
            }
            res.render('dashboard', {
                user: req.session.user,
                myWishlist: mine,
                otherWishlists: others
            })
        });
});

module.exports = router;

