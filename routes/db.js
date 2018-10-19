var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var myobj = { name: "Company Inc", address: "Highway 37" };

    req.db.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });

    req.db.collection("customers").findOne({}, function(err, result) {
        if (err) throw err;
        res.render('db', {result: result.name});
    });
});

module.exports = router;
