define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	return Backbone.View.extend({
		el: '#site-content',
		tagName: 'div',
		className: 'editor',

		events: {
			'keyup': 'changeText',
		},

		initialize: function() {
			var self = this;
			$.get('templates/editor.html', function(response){
				self.template = response;

				self.render();
				
				self.editor_pane = $("#editor");
				self.preview_pane = $("#preview");
			});
		},

		changeText: function() {
			this.model.set("contents", this.editor_pane.html());

			this.preview_pane.html(this.editor_pane.html());
		},

		render: function() {
			//rendered = Mustache.to_html(view.template, view.model.toJSON());
			rendered = Mustache.to_html(this.template, this.model.toJSON());
			$(this.el).html(rendered);
		},
	});
});