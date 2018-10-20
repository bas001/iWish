var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/:id', function (req, res, next) {
    req.db.collection("wishlist").findOne({"_id": ObjectId(req.params.id)}, function (err, wishlist) {
        if (err) throw err;

        console.log("found " + wishlist._id);
        if (wishlist.user !== req.session.user) {
            res.render('wishlist', {
                user: req.session.user,
                wishlist: wishlist
            });
        }
        else if (wishlist.items && wishlist.items.length > 0) {
            res.render('myWishlist', {
                user: req.session.user,
                wishes: wishlist.items,
                wishlistId: req.params.id
            });
        } else {
            res.render('emptyWishlist', {
                user: req.session.user,
                wishlistId: req.params.id
            });
        }

    });
});

router.post('/', function (req, res, next) {

    req.db.collection("wishlist").insert(
        {"items": [], "user": req.body.user},
        function (err, wishlist) {
            if (err) throw err;
            console.log("1 wishlist added" + wishlist.insertedIds[0]);
            res.redirect('/wishlist/' + wishlist.insertedIds[0]);

        });
});


module.exports = router;

