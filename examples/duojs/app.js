/*jslint browser:true */

var Router = require('flatiron/director:build/director.js').Router,
    routes, router,
	TodoList = require('./todo-list');

routes = {
    '/': {
		on: function () {
			TodoList.Collection.all(function (err, todos) {
				if (err) {
					console.error(err);
					return; // Short-circuit
				}

				var list = new TodoList.View(todos),
					$footer = document.querySelector('footer');

				list.render();
				document.body.insertBefore(list.$el, $footer);
			});
		}
	},
	'/active': {},
	'/completed': {}
};

router = Router(routes);
router.init('/');
