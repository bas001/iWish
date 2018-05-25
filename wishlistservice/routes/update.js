var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

router.get('/update', function (req, res, next) {


    req.db.collection("customers").updateOne({
        "_id": ObjectID("5b085aa0650c6904c8e663bf")
    },{
        $set: {name: "Company 99"}
    }, function(err, result) {
        if (err) throw err;
    });


});

module.exports = router;
