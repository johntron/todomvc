var domify = require('component/domify'),
    $template = domify(require('./template.html')),
    classes = require('component/classes'),
    event = require('component/event'),
	Todo = require('/todo'); // From build root (example/duojs)

function View(model) {
    this.model = model;
    this.$el = $template.cloneNode(true); // Clone (deep) to avoid updating original $template
}

View.prototype.render = function() {
    var $main = this.$el.querySelector('#main'),
        $footer = this.$el.querySelector('#footer');

	// Hide/show #main and #footer
	if (this.model.length) {
		classes($main).remove('hidden');
		classes($footer).remove('hidden');
	} else {
		classes($main).add('hidden');
		classes($footer).add('hidden');
	}

	// Add a view for each model
	this.model.forEach(this.add_view.bind(this));

	this.bind(); // If you ever need to unbind, remove this line, add an .unbind(), and call .bind()/.unbind() explicitly from outer conext

    return this.$el;
};

View.prototype.bind = function() {
    var $new_todo = this.$el.querySelector('#new-todo');

    event.bind($new_todo, 'keyup', this.add_handler.bind(this));
};

View.prototype.add_view = function (model) {
	var view = new Todo.View(model),
		$list = this.$el.querySelector('#todo-list');

	view.render();
	$list.appendChild(view.$el);
};

View.prototype.add_handler = function() {
    var data = {
            title: this.$el.querySelector('#new-todo').value,
            order: this.model.max('order'),
            completed: false
        },
        todo = new Todo.Model(data);

    this.model.add(todo);
	this.add(todo);
};

module.exports = {
	View: View,
	Collection: require('./collection.js')
};
