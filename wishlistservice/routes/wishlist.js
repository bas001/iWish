var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/:id', function (req, res, next) {
    req.db.collection("wishlist").findOne({"_id": ObjectId(req.params.id)}, function (err, result) {
        if (err) throw err;

        console.log(ObjectId(req.params.id));
        // In Jade File I have no id of wishlist, so I have to pass formAction :/
        if (result.items && result.items.length > 0) {
            res.render('myWishlist', {
                user: req.session.user,
                wishes: result.items,
                formAction: '/wishlist/' + req.params.id + '/item'
            });
        } else {
            res.render('emptyWishlist', {
                user: req.session.user,
                formAction: '/wishlist/' + req.params.id + '/item'
            });
        }

    });
});

router.post('/', function (req, res, next) {

    req.db.collection("wishlist").insert(
        {"items": [], "user": req.body.user},
        function (err, res) {
            if (err) throw err;
            console.log("1 wishlist added");
        });
    res.redirect('/dashboard/');
});


module.exports = router;

