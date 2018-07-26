var _ = require('lodash');
var SOURCE = 'aws-cloudwatch-annotations';

function addAnnotations(json, config) {
    var cfg = Object.assign({}, {
        limit: 3,
        'widget-title': '.*'
    }, config);
    filteredWidgets(json, cfg).forEach(w => addAnnotation(w.properties, cfg));
    return json;
}

function filteredWidgets(json, config) {
    var pattern = new RegExp(config['widget-title']);
    return _.filter(json.widgets, function (w) {
        return pattern.test(w.properties.title);
    });
}

function addAnnotation(properties, config) {
    verticalAnnotations = _.get(properties, 'annotations.vertical') || [];
    verticalAnnotations.push(getAnnotation(config));
    verticalAnnotations = cleanup(verticalAnnotations, config);
    _.set(properties, 'annotations.vertical', verticalAnnotations);
}

function getAnnotation(config) {
    return {
        label: config.label || `<i class="${SOURCE}">Deployment</i>`,
        value: config.value || new Date().toISOString()
    };
}

function cleanup(annotations, config) {
    const [managed, rest] = _.partition(annotations, (a) => a.label.includes(SOURCE))
    return rest.concat(managed.slice(-config.limit));
}

module.exports = {
    addTo: addAnnotations
}
