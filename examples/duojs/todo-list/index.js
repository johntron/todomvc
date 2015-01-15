var domify = require('component/domify'),
    $template = domify(require('./template.html')),
    classes = require('component/classes'),
    event = require('component/event'),
	Todo = require('/todo'), // From build root (example/duojs)
	ENTER_KEY = 13;

function View(model) {
    this.model = model;
    this.$el = $template.cloneNode(true); // Clone (deep) to avoid updating original $template
}

View.prototype.render = function() {
	// Hide/show #main and #footer
	if (this.model.length()) {
		this.show_chrome();
	} else {
		this.hide_chrome();
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
	view.bind();
	view.on('destroy', this.destroy_view.bind(this));
	$list.appendChild(view.$el);

	// If we just added a todo, the list cannot be empty
	this.show_chrome();
};

View.prototype.destroy_view = function (view, model) {
	var $list = this.$el.querySelector('#todo-list');

	$list.removeChild(view.$el);
	this.model.remove(model);

	if (!this.model.length()) {
		this.hide_chrome();
	}
};

View.prototype.add_handler = function(e) {
	if (e.keyCode !== ENTER_KEY) {
		return; // Short-circuit
	}

    var $input = this.$el.querySelector('#new-todo'),
		title = $input.value.trim(),
		data = {
            title: title,
            order: this.model.next_order(),
            completed: false
        },
        todo = new Todo.Model(data);

	if (todo.title() === '') {
		return; // Short-circuit
	}

    this.model.add(todo);
	this.add_view(todo);
	$input.value = '';
};

View.prototype.show_chrome = function () {
	var $main = this.$el.querySelector('#main'),
		$footer = this.$el.querySelector('#footer');
	
	classes($main).remove('hidden');
	classes($footer).remove('hidden');
};

View.prototype.hide_chrome = function () {
	var $main = this.$el.querySelector('#main'),
		$footer = this.$el.querySelector('#footer');
	
	classes($main).add('hidden');
	classes($footer).add('hidden');
};

module.exports = {
	View: View,
	Collection: require('./collection.js')
};
