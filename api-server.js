/*
 * dev-server.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var jsonFileBase = './test/mockup-data';
function isFunction(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
}
function route(fileName) {
    return function(req, res) {
        var fn = fileName;
        var args = process.argv;
        if (isFunction(fn)) fn = fn(req);
        jsonFromFile(res, fn);
    };
}

function jsonFromFile(res, fileName) {
    fs.readFile(fileName, {encoding:'utf8'}, function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(JSON.parse(data));
    });
}

function gets(router, routes) {
    routes.forEach(function(r) {
        var p = path.join(jsonFileBase, r);
        if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
        p += '.json';
        router.use(r, route(p));
    });
}

app.use(function(req, res, next) {
	console.log(req.originalUrl);
	next();
});
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var router = express.Router();
gets(router, ['/sales/agent/list/', '/sales/agent/query/', '/sales/agent/info/']);
app.use('/api', router);

var server = app.listen(3334, function() {
	var address = server.address();
	console.log('api server is running at:' + address.port);
});
