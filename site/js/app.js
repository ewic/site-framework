require.config({
	'baseUrl': '/',

	'shim': {
		'bootstrap': { 'deps': ['jquery'] },
		'backbone': { 'deps': ['underscore', 'jquery'],
						'exports': 'Backbone' }
	},

	'paths': {
		'app': 'js/app',

		//Vendor paths
		'jquery': 'lib/js/jquery.min',
		'underscore': 'lib/js/underscore-min',
		'backbone': 'lib/js/backbone-min',
		'mustache': 'lib/js/mustache.min',
		'jquery.couch': 'lib/js/jquery.couch',

		'bootstrap': 'lib/js/bootstrap.min',
	}
});

require(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	require(['js/router.js'], function(Router) {
		var router = new Router;
		Backbone.history.start();
	});

	//Create the navbar
	require(['js/views/nav'], function(NavView) {
		var nav = new NavView;
	});
	
});