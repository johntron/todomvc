# Duo TodoMVC Example

> Duo is a next-generation package manager that blends the best ideas from Component, Browserify and Go to make organizing and writing front-end code quick and painless.

> _[duojs.org](http://duojs.org/)_


## Learning Duo

The [Duo website](http://duojs.org/) covers getting started, examples, and how to reach the community.

Here are some links you may find helpful:

* [Documentation](https://github.com/duojs/duo/blob/master/Readme.md)
* [FAQ](https://github.com/duojs/duo/blob/master/docs/faq.md)
* [Duo on GitHub](https://github.com/duojs/duo)

Get help from other Duo users:

* [Mailing list on Google Groups](https://groups.google.com/forum/#!forum/duojs)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._


## Implementation

Duo makes it easy to use best-in-class CommonJS modules in the browser. Include the libraries you're most familiar with directly from:

* Github - if there's an `exports = ...`, you can use `require('author/repository:module.js')`
* The official [duojs](https://github.com/duojs) organization
* The [component](https://github.com/component) organization
* The [Component registry](http://component.github.io/)
* [npmjs.org](https://www.npmjs.com/)
* [microjs.com](http://microjs.com/)

The only design decisions Duo imposes are in dependency/package management and the build system; You can use any MV* pattern you'd like (or something completely different). For demonstration purposes, this example follows Backbone's convention:

* Models - responsible for data CRUD operations
* Views - like Controllers in the MVC pattern; business logic between what the user sees and the data
* HTML templates

Each set of Models, Views, and templates related to a single UI component are grouped together as a module under its own directory (e.g. `/todo-list` and `/todo`).

## Running

Use GNU `make` to rebuild:

```
$ make
```

This will install dependencies from npm then run Gulp with `gulpfile.js`. This gulpfile uses Duo (see `duo-build.js`) to compile the JavaScript. I've included Gulp to demonstrate how to integrate Duo with your existing toolchain; however, Duo can be used by itself - try running `./node_modules/.bin/duo app.js`.

After building, simply open `index.html` in your browser.

## Credit

This TodoMVC application was created by [John Syrinek](https://github.com/johntron).
