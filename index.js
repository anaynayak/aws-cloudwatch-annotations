var config = require('minimist')(process.argv.slice(2));
var Reader = require('./reader');
var Annotations = require('./annotations');

Reader.read(function(json) {
    console.log(JSON.stringify(Annotations.addTo(json, config)));
})