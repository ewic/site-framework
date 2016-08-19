//Blog Collection
define(['jquery', 'underscore', 'backbone', 'mustache', 'js/models/post'], function($, _, Backbone, Mustache, PostModel) {
	return Backbone.Collection.extend({
		model: PostModel
	});
});