#! /usr/bin/env node

var config = require('minimist')(process.argv.slice(2), {
    string: ['fill', 'color', 'widget-title'],
    default: { 'widget-title': '.*', limit: 5 }
});
var Reader = require('../lib/reader');
var Annotations = require('../lib/annotations');

if (config._ == 'help') {
    console.log(`
Usage:
    aws cloudwatch get-dashboard --dashboard-name $SOURCE_DASHBOARD --query 'DashboardBody' --output text | aws-cw-annotate
Options:
    --fill              Fill value for vertical annotation (before/after/between)
    --color             Annotation color
    --widget-title      Update only widgets whose title matching specified regex 
    --limit             Max number of aws-cw-annotate annotations to maintain
`);
}
if (!config._.length) {
    Reader.read(function (json) {
        console.log(JSON.stringify(Annotations.addTo(json, config)));
    });
}