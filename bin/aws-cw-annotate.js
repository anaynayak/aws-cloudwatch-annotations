#! /usr/bin/env node

var config = require('minimist')(process.argv.slice(2));
var Reader = require('../lib/reader');
var Annotations = require('../lib/annotations');

Reader.read(function(json) {
    console.log(JSON.stringify(Annotations.addTo(json, config)));
})