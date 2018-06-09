var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    req.db.collection("wishlist").findOne({"_id": Number(req.params.id)}, function (err, result) {
        if (err) throw err;
        console.log(req.params.id);
        // In Jade File I have no id of wishlist, so I have to pass formAction :/
        res.render('wishlist', {
            user: req.session.user,
            wishes: result.items,
            formAction: '/wishlist/' + req.params.id + '/item'
        });
    });
});

router.post('/:id/item', function (req, res, next) {

    req.db.collection("wishlist ").update(
        {"_id": Number(req.params.id)},
        {$push: {"items": {"description": req.body.description}}},
        function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    res.redirect('/wishlist/' + req.params.id);
});

module.exports = router;

