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

			// console.log($.couch.allDbs());
			$.getJSONP('http://localhost:5984', {
			  key: 'value',
			  otherKey: 'otherValue'
			}, function(data){
			     // Handles the callback when the data returns
			});

		},

		render: function() {
			$(this.el).html(this.template);
		}
	});
});