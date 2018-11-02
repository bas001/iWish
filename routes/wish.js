var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var uuidv1 = require('uuid/v1');


router.delete('/:id/item/:uuid', function (req, res, next) {

    req.db.collection("wishlist").update(
        {"_id": ObjectId(req.params.id)},
        {$pull: {'items': {'uuid': {$eq: String(req.params.uuid)}}}},
        function (err, res) {
            if (err) throw err;
            if (res.result) console.log("1 wish deleted");
        });
    res.end();
});

router.patch('/:id/item', function (req, res, next) {

    req.db.collection("wishlist").update(
        {'items.uuid': req.body.uuid},
        //{$set: {'items.uuid' : {'checked': req.body.checked}}},
        {$set: {'items.$.checked': req.body.checked}},
        function (err, res) {
            if (err) throw err;
        });
    res.end();

});

router.post('/:id/item', function (req, res, next) {

    req.db.collection("wishlist").update(
        {"_id": ObjectId(req.params.id)},
        {$push: {"items": {"description": req.body.description, "uuid": uuidv1(), "comments": []}}},
        function (err, res) {
            if (err) throw err;
            console.log("1 item inserted in wishlist");
        });
    res.redirect('/wishlist/' + req.params.id);
});

router.post('/:id/item/comment', function (req, res, next) {

    req.db.collection("wishlist").update(
        {'items.uuid': req.body.uuid},
        {$push: {'items.$.comments': {'content': req.body.comment, 'user': req.session.user}}},
        function (err, wishlist) {
            if (err) throw err;
            console.log("1 comment added to wish");
            res.end();
        });
});

module.exports = router;

