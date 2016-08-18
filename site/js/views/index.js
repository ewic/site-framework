define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'index',

		initialize: function() {
			var self = this;
			$.get('templates/index.html', function(response) {
				self.template = response;

				self.render();
			});
		},

		render: function() {
			$(this.el).html(this.template);
		}
	});
});