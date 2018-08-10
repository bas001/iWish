var express = require('express');
var router = express.Router();


router.post('/:id/item/comment', function (req, res, next) {

    req.db.collection("wishlist").update(
        {
            'items.uuid': req.body.uuid
        },
        {$push: {'items.$.comments': {'content': req.body.comment}}},
        function (err, res) {
            if (err) throw err;
            console.log("comment added to item");
        });
    res.redirect('/wishlist/' + req.params.id);
});

router.delete('/:id/item', function (req, res, next) {

    req.db.collection("wishlist").deleteOne(
        {
            'items.uuid': req.body.uuid
        },
        function (err, res) {
            if (err) throw err;
            console.log("1 item deleted");
        });
    res.redirect('/wishlist/' + req.params.id);
});

module.exports = router;

