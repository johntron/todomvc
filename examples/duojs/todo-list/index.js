/*jslint browser: true */

var domify = require('component/domify'),
    $template = domify(require('./template.html')),
    classes = require('component/classes'),
    event = require('component/event'),
	Todo = require('/todo'), // From build root (example/duojs)
	ENTER_KEY = 13,
	interpolate = require('stephenmathieson/interpolate'),
	_ = require('/i18n');

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
    var $new_todo = this.$el.querySelector('#new-todo'),
		$mark_all = this.$el.querySelector('#toggle-all'),
		$clear = this.$el.querySelector('#clear-completed');

    event.bind($new_todo, 'keyup', this.add_handler.bind(this));
	event.bind($mark_all, 'change', this.toggle_all.bind(this));
	event.bind($clear, 'click', this.clear_completed.bind(this));
};

View.prototype.add_view = function (model) {
	var view = new Todo.View(model),
		$list = this.$el.querySelector('#todo-list');

	view.render();
	view.bind();
	view.on('destroy', this.destroy_view.bind(this));
	$list.appendChild(view.$el);
	
	model.on('change completed', this.refresh_footer.bind(this));
	model.on('destroy', this.destroy_view.bind(this, view));

	// If we just added a todo, the list cannot be empty
	this.show_chrome();
};

View.prototype.destroy_view = function (view, model) {
	var $list = this.$el.querySelector('#todo-list');

	$list.removeChild(view.$el);

	if (!model) {
		return; // Short-circuit
	}

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

View.prototype.toggle_all = function () {
	var completed = this.$el.querySelector('#toggle-all').checked;

	this.model.each(function (todo) {
		todo.completed(completed);
	});
};

View.prototype.show_chrome = function () {
	var $main = this.$el.querySelector('#main'),
		$footer = this.$el.querySelector('#footer');
	
	classes($main).remove('hidden');
	classes($footer).remove('hidden');

	this.refresh_footer();
};

View.prototype.hide_chrome = function () {
	var $main = this.$el.querySelector('#main'),
		$footer = this.$el.querySelector('#footer');
	
	classes($main).add('hidden');
	classes($footer).add('hidden');
};

View.prototype.refresh_footer = function () {
	this.refresh_incomplete();
	this.refresh_complete();
};

View.prototype.refresh_incomplete = function () {
	var $incomplete = this.$el.querySelector('#todo-count'),
		count = this.model.num_incomplete(),
		remaining = _.ngettext('{count} item left', '{count} items left', count);

	remaining = interpolate(remaining, {count: count});
	$incomplete.textContent = remaining;
};

View.prototype.refresh_complete = function () {
	var $clear = this.$el.querySelector('#clear-completed'),
		count = this.model.num_complete(),
		clear = _.gettext('Clear completed ({count})');

	clear = interpolate(clear, {count: count});
	$clear.textContent = clear;
};

View.prototype.clear_completed = function () {
	this.model.destroy_completed();
	this.refresh_footer();

	if (!this.model.length()) {
		this.hide_chrome();
	}
};

module.exports = {
	View: View,
	Collection: require('./collection.js')
};
