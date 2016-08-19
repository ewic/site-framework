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

		'bootstrap': 'lib/js/bootstrap.min',
	}
});

require(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	var Router = Backbone.Router.extend({
		// App routes
		routes: {
			"editor": "editor",
			"about": "about",
			"*path": "defaultRoute",
		},

		editor: function() {
			this.set_title("Editor");

			require(['js/views/editor', 'js/models/post'], function(EditorView, PostModel) {
				var post = new PostModel;
				var editor = new EditorView({model: post});
			});
		},

		about: function() {
			this.set_title("About");

			require(['js/views/about'], function(AboutView) {
				var about = new AboutView;
			});
		},

		defaultRoute: function() {
			require(['js/views/index'], function(IndexView) {
				var index = new IndexView;
			});
		},

		set_title: function(title) {
			$('.navbar-brand').html(title);
			$('title').html(title+' | ewic.us');
		}
	});
	var router = new Router;
	Backbone.history.start();

	//Create the navbar
	require(['js/views/nav'], function(NavView) {
		var nav = new NavView;
	});
});