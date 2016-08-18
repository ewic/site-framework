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

define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	var self = this;

	var Router = Backbone.Router.extend({
		// App routes
		routes: {
			"editor": "editor",
			"*path": "defaultRoute",
		},

		editor: function() {
			console.log("Editor");

			this.set_title("Editor");

			require(['js/views/editor', 'js/models/post'], function(EditorView, PostModel) {
				var post = new PostModel;
				self.view = new EditorView({model: post});
			});
		},

		defaultRoute: function() {
			console.log("defaultRoute");

			require(['js/views/nav'], function(NavView) {
				var nav = new NavView;
			});

			require(['js/views/index'], function(IndexView) {
				var index = new IndexView;
			});
		},

		set_title: function(title) {
			$('.navbar-brand').html(title);
			$('title').html(title+' | ewic.us');
		}
	});

	// var index = new IndexView;
	var router = new Router;

	Backbone.history.start();
});