var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/:id', function (req, res, next) {
    req.db.collection("wishlist").findOne({"_id": ObjectId(req.params.id)}, function (err, wishlist) {
        if (err) throw err;

        if (wishlist.user !== req.session.user) {
            res.render('wishlist', {
                user: req.session.user,
                wishlist: wishlist
            });
            return;
        }

        if (!wishlist.published) {
            if (wishlist.items && wishlist.items.length > 0) {
                res.render('myWishlist', {
                    user: req.session.user,
                    wishes: wishlist.items,
                    wishlistId: req.params.id
                });
            }
            else {
                res.render('emptyWishlist', {
                    wishlistId: req.params.id
                });
            }
            return;

        }

        res.render('publishedWishlist', {
            wishes: wishlist.items
        });

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

router.patch('/:id', function (req, res, next) {

    req.db.collection("wishlist").update(
        {"_id": ObjectId(req.params.id)},
        {$set: {"published": req.body.published}},
        function (err, res) {
            if (err) throw err;
            if (res.result) console.log("wishlist publlshed " + req.params.id);
        });
});

module.exports = router;

