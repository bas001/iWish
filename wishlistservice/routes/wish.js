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
            console.log("1 document updated");
        });
    res.redirect('/wishlist/' + req.params.id);
});

module.exports = router;

