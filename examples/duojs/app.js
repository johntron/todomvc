var Router = require('flatiron/director:build/director.js').Router,
    routes, router,
	TodoList = require('./todo-list');

routes = {
    '/': {
		on: function () {
			var $list = document.querySelector('#todoapp'),
				list = new TodoList($list);

			list.render();
		}
	},
	'/active': {},
	'/completed': {}
};

router = Router(routes);
router.init('/');
