var express = require('express');
var uuidv1 = require('uuid/v1');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    req.db.collection("wishlist").findOne({"_id": Number(req.params.id)}, function (err, result) {
        if (err) throw err;
        // In Jade File I have no id of wishlist, so I have to pass formAction :/
        res.render('wishlist', {
            user: req.session.user,
            wishes: result.items,
            formAction: '/wishlist/' + req.params.id + '/item'
        });
    });
});

router.post('/:id/item', function (req, res, next) {

    req.db.collection("wishlist").update(
        {"_id": Number(req.params.id)},
        {$push: {"items": {"description": req.body.description, "uuid": uuidv1()}}},
        function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    res.redirect('/wishlist/' + req.params.id);
});

module.exports = router;

