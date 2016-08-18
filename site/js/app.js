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
	var Router = Backbone.Router.extend({
		//Make the router to do the thing.

		
	});

	var PostModel = Backbone.Model.extend({
		defaults: {
			date: Date.now(),
			last_updated: Date.now(),
			contents: $('#tpl-model-default').html(),
		},

		initialize: function(post_id) {
			console.log("Post Model created");

			//Init the post model by retrieving the post data from the server
			// and loading it into the model.
		},
	});

	var EditorView = Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'editor',

		template: ($('#tpl-editor').html()),

		events: {
			'keyup': 'changeText',
		},

		initialize: function() {
			console.log("editor view made");
			this.render();

			console.log(this.model.get("contents"));

			this.editor_pane = $("#editor");
			this.preview_pane = $("#preview");
		},

		changeText: function() {
			console.log("keyup triggered");
			this.model.set("contents", this.editor_pane.html());

			this.preview_pane.html(this.editor_pane.html());
		},

		render: function() {
			//rendered = Mustache.to_html(view.template, view.model.toJSON());
			rendered = Mustache.to_html(this.template, this.model.toJSON());
			$(this.el).html(rendered);
		},
	});

	var router = new Router;
	var post = new PostModel;
	var editor = new EditorView({model: post});
});