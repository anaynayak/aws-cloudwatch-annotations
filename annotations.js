
function addAnnotations(json, config) {
    json.widgets.forEach(w => addAnnotation(w.properties, config));
    return json;
}

function addAnnotation(properties, config) {
    properties.annotations = properties.annotations || {};
    properties.annotations.vertical = [
        {
            label: "Deployment",
            source: 'aws-cloudwatch-annotations',
            value: "2018-06-26T02:56:36.000Z"
        }
    ];
}

module.exports = {
    addTo: addAnnotations
}
