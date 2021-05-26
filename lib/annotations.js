import { filter, get, set, pick, partition } from 'lodash-es';
var SOURCE = 'aws-cloudwatch-annotations';

function addAnnotations(json, type, config) {
    filteredWidgets(json, config).forEach(w => addAnnotation(w.properties, type, config));
    return json;
}

function filteredWidgets(json, config) {
    var pattern = new RegExp(config.widgetTitle);
    return filter(json.widgets, function (w) {
        return pattern.test(w.properties.title);
    });
}

function addAnnotation(properties, type, config) {
    var annotations = get(properties, `annotations.${type}`) || [];
    if (get(properties,'annotations.alarms')) {
        return;
    }
    annotations.push(getAnnotation(config));
    annotations = cleanup(annotations, config);
    set(properties, `annotations.${type}`, annotations);
}

function getAnnotation(config) {
    var formatted = config.title.replace(/\[/g, '\[').replace(/\]/g, '\]');
    var annotation = {
        label: `[${formatted}](#${SOURCE})`,
        value: config.value || new Date().toISOString()
    };
    Object.assign(annotation, pick(config, ['fill', 'color']));
    if (config.upto) {
        var copy =  Object.assign({}, annotation);
        copy.value = config.upto;
        return [copy, annotation];
    }
    return annotation;
}

function cleanup(annotations, config) {
    const [managed, rest] = partition(annotations, (a) => {
        var aAnnotation = Array.isArray(a) ? a[0] : a ;
        return aAnnotation.label.includes(SOURCE);
    })
    return rest.concat(managed.slice(-config.limit));
}

export const addTo = addAnnotations;
