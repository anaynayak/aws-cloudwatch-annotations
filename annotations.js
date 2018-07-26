
function addAnnotations(json, config) {
    var cfg = Object.assign({}, {
        limit: 3
    }, config)
    json.widgets.forEach(w => addAnnotation(w.properties, cfg));
    return json;
}

function addAnnotation(properties, config) {
    properties.annotations = properties.annotations || {};
    properties.annotations.vertical = properties.annotations.vertical || [];
    processAnnotations(properties.annotations, config)
}

function processAnnotations(annotations, config) {
    annotations.vertical.push(
        {
            label: config.label || "Deployment",
            source: 'aws-cloudwatch-annotations',
            value: config.value || new Date().toISOString()
        }
    );
    annotations.vertical = annotations.vertical.slice(-config.limit);
}

module.exports = {
    addTo: addAnnotations
}
