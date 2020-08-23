var Annotations = require('../lib/annotations');
var cloudwatch = require('../lib/cloudwatch');


const gremlinRoutes = (app, fs) => {
	//POST
	app.post('/gremlins', (req, res) => {
		console.log(req.body.time);
		
		let name = 'Online-Boutique-Webhooks-v2';
    		let type = 'vertical';

    		cloudwatch.getDashboard(name).then(data => {
        		var body = Annotations.addTo(data, type, { title: 'Gremlin '+req.body.attackType+" "+req.body.attackStatus, 'widget-title':'CPU Utilization', value: req.body.time });
        		return cloudwatch.putDashboard(name, body).catch((err) => {
            			console.error(err.message);
            			process.exit(1);
        		});
    		}).catch((err) => {
        		console.error(err.message);
        		process.exit(1);
    		})

		res.status(200).send('New Gremlin webhook added');
	});

};

module.exports = gremlinRoutes;
