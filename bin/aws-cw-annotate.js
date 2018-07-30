#! /usr/bin/env node
var meow = require('meow');
var getStdin = require('get-stdin');
var Annotations = require('../lib/annotations');

var config = meow(`
Usage:
    aws cloudwatch get-dashboard --dashboard-name $SOURCE_DASHBOARD --query 'DashboardBody' --output text | aws-cw-annotate <horizontal|vertical|help>
Options:
    --fill, -f              Fill value for vertical annotation (before/after/between)
    --color, -c             Annotation color
    --widget-title, -w      Update only widgets whose title matching specified regex
    --limit, -l             Max number of aws-cw-annotate annotations to maintain
    --title, -t             Annotation title
    --value, -v             Annotation value
`, {
        flags: {
            title: {
                type: 'string',
                alias: 't',
                default: 'Deployment'
            },
            value: {
                type: 'string',
                alias: 'l'
            },
            fill: {
                type: 'string',
                alias: 'f'
            },
            color: {
                type: 'string',
                alias: 'c'
            },
            'widget-title': {
                type: 'string',
                alias: 'w',
                default: '.*'
            },
            limit: {
                type: 'number',
                alias: 'l',
                default: 5
            }
        }
    });

if (config.input.length == 0 || !['horizontal', 'vertical'].includes(config.input[0])) {
    config.showHelp();
}

getStdin().then(jsonString => {
    console.log(JSON.stringify(Annotations.addTo(JSON.parse(jsonString), config.input[0], config.flags)));
});
