var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {
    res.send("deliveries");
});

router.get('/packages', function(req, res, next) {
    var options = {
        host: "codetest.kube.getswift.co",
        path: '/packages'
    };
    http.get(options, function(response) {
        var data = [];

        response.on("data", function(chunk) {
            data += chunk;
        });
        response.on("end", function() {
            // console.log(typeof data);
            data = JSON.parse(data);
            // console.log(typeof data);
            // console.log(data[0]);

            // console.log("Packages: ", data);
            console.log("Got packages");
            res.send(data);
        });

    });
});

router.get('/drones', function(req, res, next) {
    var options = {
        host: "codetest.kube.getswift.co",
        path: '/drones'
    };
    http.get(options, function(response) {
        var data = [];

        response.on("data", function(chunk) {
            data += chunk;
        });
        response.on("end", function() {
            // console.log(typeof data);
            data = JSON.parse(data);
            // console.log(typeof data);
            // console.log(data[0]);

            // console.log("Drones: ", data);
            console.log("Got drones");
            res.send(data);
        });

    });
});

module.exports = router;