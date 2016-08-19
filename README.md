# site-framework

This is a basic site framework.  Please see examples for all the bootstrap examples you need to html your stuff.

## Requirements

* NodeJS and NPM
* MongoDB

## Installation instructions'

* `npm install`
* `./build.sh`
* `node server.js`
* Make your dreams.

# Architectural Overview

Since this project was created as an educational exercise, I feel like I should write up a little description of how everything is wired together.  There is nothing here that can't be found in the main documentation for Backbone, Bootstrap or what have you, or various tutorials around the web, however I felt it would be productive to include it here, if anybody else needs some help, another perspective, or would like to offer some constructive criticism for the way I'm doing things.

## Directory structure

Hopefully this will be simple to understand.  All dependencies are copied in the build script to their respective places inside `/site/lib`.  The only point of interest is that the root directory contains the server itself, which is a uses Node serve-static, this means that you could theoretically use any server you would like, such as apache or nginx or so, and the site itself is stored underneath `/site/`

## Stack of tech

The only requirements to run on a server is Node and NPM, everything else is installed from there.  Running `npm install` will download all the dependencies needed to render and run the site.  The build script is a super simple bash script that copies the certain libraries such as **jQuery** and **Backbone** from the `node_modules` folder to the `/site/lib/` folder.  

## RequireJS and You

This framework makes use of RequireJS to modularize all of its pieces and keep its dependency tree clean and (hopefully) readable.

### require() vs define()

RequireJS is used via `require()` and `define()` blocks.  `require()` is used to load all dependencies for use in the immediate context.  `define()` is used to create a reusable module that may be used in multiple places across the application.  In this exercise, I typically use `define()` to define a view or model and `require()` when the view is actually created.  

For example, the following three files create two modules via `define()` and then uses them via a require block.  Remember that RequireJS works off of filenames, so that 

Two files both of which return some class declaration, such as a Backbone model or view.

```
define( ['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
	//Return some class declaration
	return someObject();
});
```

In your app, or anywhere, really:

```
require( ['js/dependency1', 'js/dependency2'], function(Dependency1, Dependency2) {
	//Do things with the dependencies here
	object1 = new Dependency1;
	object2 = new Dependency2;
});
```

What this does is load the files `js/dependency1.js` and `js/dependency2.js` and assigns references `Dependency1` and `Dependency2` to it for use within the context of the require block.  Since the define blocks return an object class, whatever class they describe can be instantiated inside the require block using `new`.

### RequireJS config

The configuration of RequireJS is the first thing handled in `app.js`.  It defines bootstrap and backbone as 'shims', which are a method of essentially treating non-AMD modules as AMD modules and making sure they are always loaded with their dependencies..  In my project, I am shimming bootstrap and backbone.  This way Bootstrap, for example, is always loaded with jQuery and can't be loaded without, because it's a hard dependency.

The paths are defined so that we don't have to explicitly write out the complete file path name throughout the app when we are referring to lib files.

## BackboneJS

The MV architecture is created using a series of Backbone Models and Views. 

### Model-View-Whatever

The model-view framework is pretty common in the world of web applications now, but I figured I would take a moment to point out that this entire framework does not include a controller of any kind, to handle business logic.  Instead the models and views will have to handle some of that.  This does break a standard of MVC, where the Model is supposed to only be a representation of a database item and the View is only supposed to handle logic associated with appearance.  Transformation and processing of data should be handled in some kind of Controller.  We are forgoing that in favor of simplicity.  If you are building a more robust application that where a large amount of data processing and transformation is to occur, it would make sense to add in some type of controller, although I would probably not build it in Javascript. 

### Backbone Routing

Routing is handled in the main `app.js` file.  I chose not to seperate out the router into its own file because it seemed unnecessary for something so simple.

Routing is handled by creating a new instance of `Backbone.Router` with routes.  Please note that Backbone requires a call to `Backbone.history.start()` in order to handle hashtag urls.

Adding a new route can be done by adding an item to the `Backbone.Router.routes` JSON object.  Each route is a hash-function pair, where the element name is the hash that is matched by the URL and the element value is a callback function.  This means that when you create a new route, you must create a corresponding function like so:

```
routes: {
	'myRoute': 'myFunction'
	},
	
myFunction: function() {
	//Do whatever you'd like here
},
```

The above example will create a route that will match `www.yoursite.com/#myRoute` and call the function `myFunction()` when that URL is hit.  In my exercise, I am typically using this opportunity to create whatever views and models I need depending on the URL that is hit.  **Note** that the routing functions typically contain a require block to load the necessary dependencies to create the views and models.  This is how I can keep each piece modularized and avoid having to declare a massive dependency tree at the top of the define block.

### Backbone Views and Templating

When a view is created, it will be created unattached to any DOM element.  This is because when a view is created, it does not have any template information.  In many examples found elsewhere online, external templating is handled by feeding some jQuery identifier to the `template` attribute of the view and either rendering it as HTML directly or feeding it through some templating engine such as Handlebars or Mustache so the view knows what it's supposed to look like.  In many of these examples, the actual template content is already loaded into the DOM like so:

```
<script type="text/html" id="tpl-demonstration">
	<p>Template content is here</p>
</script>
```

Thus the template **must** live in the same file as the JS, otherwise the view will be unable to access the template to render itself.  To get around this, many tutorials suggest using `jQuery.get()`, which takes a URL and a function callback to retrieve HTML from an external file and execute operations on it using the callback like so:

```
$.get('templates/myTemplate.html'm function(response) {
	//response will be the raw HTML from the get() operation.
	console.log(response);
});
``` 

Unfortunately, the view itself will *still* be unable to render itself directly from this template, because `$.get()` is a promise object, loaded asynchronously from the server **after** the view is already loaded.  In order for the view to render itself, it must call render **from within** the context of the promise object, which is within the callback of the `$.get()` function call.  The view itself must be passed in to that callback by setting another variable, in my case I use `self` equal to `this`.  From there we can set `self.template` equal to the response of the network call and **finally** call `self.render()`, which will be able to render itself now because it has a valid template loaded.

For typical content, I have chosen to create a `<div id="site-content">` element in the primary index.html file, whose contents are empty.  When a view is loaded, the render function will be able to set the contents of `$('#site-content')` to the rendered view.  

### Mustache templating

For a static page, it is as simple as described above.  For a page with content loaded dynamically from the server, I chose to use MustacheJS to render content.  MustacheJS is a logic-free templating system.  It **only** resolves variables to their values.  All logical operations must still be done in Backbone.

The basic description of how Mustache renders data is using `Mustache.to_html(template, data)`, where `template` is a string containing HTML and Mustache variables (identified like this: `{{var}}`), and `data` is a JSON object containing corresponding variable names and values.  Mustache will render the HTML, replacing all variables with their values from the JSON object.  For example:

```
<!-- Template in HTML -->
<h1>{{title}}</h1>
<p>{{paragraph_content}}</p>
```

```
//Data in a JSON obect
data = {
  "title" : "My Title",
  "paragraph_content": "This is the contents to a paragraph",
}
```

When the above two are loaded as arguments to `Mustache.to_html(template, data)`, the template is rendered as such:

```
<!-- Template in HTML -->
<h1>My Title</h1>
<p>This is the contents to a paragraph"</p>
```

### Backbone-Mustache connection

I have elected to render Backbone model data by using Backbone's `Backbone.Model.toJSON()` method to resolve a Backbone model to a JSON object and feed that object to the second argument of `Mustache.to_html(template, data)`.  This means the model can retrieve its data from the server, perform whatever math or functions it need on that data, then pass itself as a JSON object to Mustache to be rendered.

## Databasing

`TODO`