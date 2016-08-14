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
	var EditorView = Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'editor',

		template: Mustache.render($('#tpl-editor').html()),

		events: {
			'keyup': 'changeText',
		},

		initialize: function() {
			this.render();
			console.log("editor view made");
		},

		changeText: function() {
			console.log("keyup triggered");
			$('#preview').html(this.$el.html());
		},
	});

	var editor = new EditorView;
});