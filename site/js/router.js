//Router
define(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	return Backbone.Router.extend({
		// App routes
		routes: {
			"blog": "blog",
			"editor": "editor",
			"about": "about",
			"*path": "defaultRoute",
		},

		blog: function() {
			this.set_title("Blog");

			require(['js/views/blog', 'js/collections/blog'], function(BlogView, BlogCollection) {
				//A blog is just a collection of posts!
				var blogCollection = new BlogCollection;
				var blog = new BlogView({collection: blogCollection});
			});
		}

		editor: function() {
			this.set_title("Editor");

			require(['js/views/editor', 'js/models/post'], function(EditorView, PostModel) {
				var post = new PostModel;
				var editor = new EditorView({model: post});
			});
		},

		about: function() {
			this.set_title("About");

			require(['js/views/about'], function(AboutView) {
				var about = new AboutView;
			});
		},

		defaultRoute: function() {
			require(['js/views/index'], function(IndexView) {
				var index = new IndexView;
			});
		},

		set_title: function(title) {
			$('.navbar-brand').html(title);
			$('title').html(title+' | ewic.us');
		}
	});
});