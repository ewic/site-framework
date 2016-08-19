//Blog View
define(['jquery', 'underscore', 'backbone', 'mustache', 'js/models/post'], function($, _, Backbone, Mustache, PostModel) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'blog',

		events: {
		},

		initialize: function() {
			var self = this;

			$.get('templates/editor.html', function(response){
				self.template = response;

				self.render();
			});
		},

		render: function() {
			//rendered = Mustache.to_html(view.template, view.model.toJSON());
			rendered = Mustache.to_html(this.template, this.model.toJSON());
			$(this.el).html(rendered);
		},
	});
});