define(['jquery', 'underscore', 'backbone', 'mustache', 'mongoose'], function($, _, Backbone, Mustache) {
	return Backbone.Model.extend({
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
});