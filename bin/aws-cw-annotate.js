#! /usr/bin/env node
var meow = require('meow');
var Annotations = require('../lib/annotations');
var cloudwatch = require('../lib/cloudwatch');

var config = meow(`
Usage:
    aws-cw-annotate dashboard_name 
Options:
    --fill, -f              Fill value for annotation (before/after/between)
    --color, -c             Annotation color
    --widget-title, -w      Update only widgets whose title matching specified regex
    --limit, -l             Max number of aws-cw-annotate annotations to maintain
    --title, -t             Annotation title
    --value, -v             Annotation value
    --horizontal, -h        Add horizontal annotation instead of vertical (default)
    --preview, -p           Generate preview json only
    --upto, -u <value>      Add an annotation between --value and --upto 
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
            },
            horizontal: {
                type: 'boolean',
                alias: 'h',
                default: false
            },
            preview: {
                type: 'boolean',
                alias: 'p',
                default: false
            },
            upto: {
                type: 'string',
                alias: 'u'
            }
        }
    });

if (config.input.length == 0 || config.input == 'help') {
    config.showHelp();
}

var type = config.flags.horizontal ? 'horizontal' : 'vertical';
var name = config.input[0];

cloudwatch.getDashboard(name).then(data => {
    var body = Annotations.addTo(data, type, config.flags);
    if(config.flags.preview) {
        console.log(JSON.stringify(body));
        return Promise.resolve(body);
    }
    return cloudwatch.putDashboard(name, body).catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
}).catch((err) => {
    console.error(err.message);
    process.exit(1);
})