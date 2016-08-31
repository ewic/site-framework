define(['jquery', 'underscore', 'backbone', 'mustache', 'jquery.couch'], function($, _, Backbone, Mustache) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'about',

		initialize: function() {
			var self = this;
			$.get('templates/about.html', function(response) {
				self.template = response;

				self.render();
			});

			var data = {
				db: 'blog',
				collection: 'posts',
				doc: JSON.stringify( {test7: true} )
			};

			$.post('/insert', data, function(response) {
				console.log(response);
			});

		},

		render: function() {
			$(this.el).html(this.template);
		}
	});
});