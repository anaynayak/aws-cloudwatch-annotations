var _ = require('lodash');
var SOURCE = 'aws-cloudwatch-annotations';

function addAnnotations(json, type, config) {
    filteredWidgets(json, config).forEach(w => addAnnotation(w.properties, type, config));
    return json;
}

function filteredWidgets(json, config) {
    var pattern = new RegExp(config['widget-title']);
    return _.filter(json.widgets, function (w) {
        return pattern.test(w.properties.title);
    });
}

function addAnnotation(properties, type, config) {
    var annotations = _.get(properties, `annotations.${type}`) || [];
    if (_.get(properties,'annotations.alarms')) {
        return;
    }
    annotations.push(getAnnotation(config));
    annotations = cleanup(annotations, config);
    _.set(properties, `annotations.${type}`, annotations);
}

function getAnnotation(config) {
    var annotation = {
        label: `<i class="${SOURCE}">${config.title}</i>`,
        value: config.value || new Date().toISOString()
    };
    Object.assign(annotation, _.pick(config, ['fill', 'color']));
    return annotation;
}

function cleanup(annotations, config) {
    const [managed, rest] = _.partition(annotations, (a) => a.label.includes(SOURCE))
    return rest.concat(managed.slice(-config.limit));
}

module.exports = {
    addTo: addAnnotations
}
