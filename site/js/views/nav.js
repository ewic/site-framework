define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	return Backbone.View.extend({
		el: 'nav',
		tagName: 'div',
		className: 'navbar',

		data: {
			items: [
				{'link': '#', 'name': 'Home'},
				{'link': '#blog', 'name': 'Blog'},
				{'link': '#about', 'name': 'About'},
			]
		},

		initialize: function() {
			var self = this;
			$.get('templates/nav.html', function(response) {
				self.template = response;

				self.render();
			});
		},

		render: function() {
			var items = this.items;
			$(this.el).html(Mustache.to_html(this.template, this.data));
		}
	});
});