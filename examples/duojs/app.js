/*jslint browser:true */

var Router = require('flatiron/director:build/director.js').Router,
    routes, router,
    TodoList = require('./todo-list'),
    list;

require('/i18n'); // Make sure `_` translation method is available

TodoList.Collection.all(function(err, todos) {
    if (err) {
        console.error(err);
        return; // Short-circuit
    }

    var $footer = document.querySelector('footer');

    list = new TodoList.View(todos);
	list.bind();
    document.body.insertBefore(list.$el, $footer);
});

routes = {
    '/': function() { list.render_all(); },
    '/active': function () { list.render_active(); },
    '/completed': function () { list.render_completed(); }
};

Router(routes).init('/');
