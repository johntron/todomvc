var classes = require('component/classes');

function TodoList($el) {
	this.$el = $el;
}

TodoList.prototype.render = function () {
	var $main = this.$el.querySelector('#main'),
		$footer = this.$el.querySelector('#footer');

	classes($main).add('hidden');
	classes($footer).add('hidden');
};

module.exports = TodoList;
