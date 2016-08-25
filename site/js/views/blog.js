//Blog View
define(['jquery', 'underscore', 'backbone', 'mustache', 'js/models/post', 'jquery.couch'], function($, _, Backbone, Mustache, PostModel) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'blog',

		events: {
		},

		initialize: function() {
			var self = this;

			$.get('templates/blog.html', function(response){
				self.template = response;

				self.render();
			});
		},

		render: function() {
			$(this.el).html(this.template);
		},
	});
});