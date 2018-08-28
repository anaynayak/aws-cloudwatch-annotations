var Annotations = require('../lib/annotations')

test('should do nothing if there are no widgets', () => {
    expect(Annotations.addTo({
        widgets: []
    }, 'vertical', { limit: 3, 'widgetTitle': '.*' })).toEqual({ widgets: [] });
});

test('should add specified annotation to the widget', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {}
        }]
    }, 'vertical', { title: 'Deployment', value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "[Deployment](#aws-cloudwatch-annotations)",
                            value: "2018-06-26T02:56:36.000Z",
                        }
                    ]
                }
            }
        }]
    });
});

test('should handle square brackets in annotation label', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {}
        }]
    }, 'vertical', { title: '[Deployment]', value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "[\[Deployment\]](#aws-cloudwatch-annotations)",
                            value: "2018-06-26T02:56:36.000Z",
                        }
                    ]
                }
            }
        }]
    });
});

test('should support addition of time range annotation', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {}
        }]
    }, 'vertical', {
            title: 'Deployment',
            value: "2018-06-26T02:56:36.000Z",
            upto: "2018-06-26T02:56:36.000Z"
        })).toEqual({
            widgets: [{
                title: "widget1",
                properties: {
                    annotations: {
                        vertical: [
                            [
                                {
                                    label: "[Deployment](#aws-cloudwatch-annotations)",
                                    value: "2018-06-26T02:56:36.000Z",
                                },
                                {
                                    label: "[Deployment](#aws-cloudwatch-annotations)",
                                    value: "2018-06-26T02:56:36.000Z",
                                }
                            ]
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
    }, 'vertical', { title: 'Deployment', color: '#fff', fill: 'before', value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "[Deployment](#aws-cloudwatch-annotations)",
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

test('should not add annotations for alarm widgets', () => {
    expect(Annotations.addTo({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    alarms: ['alarm1']
                }
            }
        }]
    }, 'vertical', { title: 'Deployment', color: '#fff', fill: 'before', value: "2018-06-26T02:56:36.000Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    alarms: ['alarm1']
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
                            label: "[Older Deployment](#aws-cloudwatch-annotations)",
                            value: "2018-06-26T02:56:36.000Z",
                        },
                    ]
                }
            }
        }]
    }, 'vertical', { limit: 1, title: 'Deployment', value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "[Deployment](#aws-cloudwatch-annotations)",
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
                            label: "[Older Deployment](#aws-cloudwatch-annotations)",
                            value: "2018-06-26T02:56:36.000Z",
                        },
                    ]
                }
            }
        }]
    }, 'vertical', { title: 'Deployment', limit: 2, value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [{
            title: "widget1",
            properties: {
                annotations: {
                    vertical: [
                        {
                            label: "[Older Deployment](#aws-cloudwatch-annotations)",
                            value: "2018-06-26T02:56:36.000Z",
                        },
                        {
                            label: "[Deployment](#aws-cloudwatch-annotations)",
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
    }, 'vertical', { title: 'Deployment', limit: 1, value: "2018-08-26T12:56:36.100Z" })).toEqual({
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
                            label: "[Deployment](#aws-cloudwatch-annotations)",
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
    }, 'vertical', { title: 'Deployment', 'widgetTitle': '.*deployment.*', value: "2018-08-26T12:56:36.100Z" })).toEqual({
        widgets: [
            {
                properties: {
                    title: "My deployment timeline",
                    annotations: {
                        vertical: [
                            {
                                label: "[Deployment](#aws-cloudwatch-annotations)",
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
