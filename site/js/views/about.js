define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'about',

		initialize: function() {
			console.log('about view created');

			var self = this;
			$.get('templates/about.html', function(response) {
				self.template = response;

				self.render();
			});
		},

		render: function() {
			$(this.el).html(this.template);
		}
	});
});