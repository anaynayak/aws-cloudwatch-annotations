var Annotations = require('../lib/annotations')

test('should do nothing if there are no widgets', () => {
    expect(Annotations.addTo({
        widgets: []
    })).toEqual({ widgets: [] });
});

test('should add specified annotation to the widget', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {}
        }]
    }, { value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                            value: "2018-06-26T02:56:36.000Z",
                        }
                    ]
                }
            }
        }]
    });
});

test('should add annotation with optional attributes to the widget', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {}
        }]
    }, { color: '#fff', fill: 'before', value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                            value: "2018-06-26T02:56:36.000Z",
                            fill: 'before',
                            color: '#fff'
                        }
                    ]
                }
            }
        }]
    });
});

test('should limit added annotations to the widget', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Older Deployment</i>',
                            value: "2018-06-26T02:56:36.000Z",
                        },
                    ]
                }
            }
        }]
    }, { limit: 1, value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                            value: "2018-08-26T12:56:36.100Z",
                        },
                    ]
                }
            }
        }]
    });
});

test('should not delete existing annotations if within limit', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Older Deployment</i>',
                            value: "2018-06-26T02:56:36.000Z",
                        },
                    ]
                }
            }
        }]
    }, { limit: 2, value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: '<i class="aws-cloudwatch-annotations">Older Deployment</i>',
                            value: "2018-06-26T02:56:36.000Z",
                        },
                        {
                            label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                            value: "2018-08-26T12:56:36.100Z",
                        }
                    ]
                }
            }
        }]
    });
});

test('should not consider other annotations for the limit', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "Manually added",
                            value: "2018-06-26T02:56:36.000Z",
                        },
                    ]
                }
            }
        }]
    }, { limit: 1, value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "Manually added",
                            value: "2018-06-26T02:56:36.000Z",
                        },
                        {
                            label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                            value: "2018-08-26T12:56:36.100Z",
                        }
                    ]
                }
            }
        }]
    });
});

test('should only add to matching target widgets', () => {
    expect(Annotations.addTo({
        widgets: [
            {
                properties: {
                    title: "My deployment timeline",
                }
            },
            {
                properties: {
                    title: "widget1",
                }
            }
        ]
    }, { 'widget-title': '.*deployment.*', value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [
            {
                properties: {
                    title: "My deployment timeline",
                    annotations: {
                        vertical: [
                            {
                                label: '<i class="aws-cloudwatch-annotations">Deployment</i>',
                                value: "2018-08-26T12:56:36.100Z",
                            }
                        ]
                    }
                }
            },
            {
                properties: {
                    title: "widget1",
                }
            }
        ]
    });
});
