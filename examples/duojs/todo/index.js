var classes = require('component/classes'),
	domify = require('component/domify'),
	$template = domify(require('./template.html')),
	events = require('johntron/events@capture'),
	emitter = require('component/emitter'),
	ENTER_KEY = 13,
	ESCAPE_KEY = 27;

function View (model) {
	this.model = model;
	this.$el = $template.cloneNode(true); // Clone (deep) to avoid updating original $template
	this.events = events(this.$el, this); // Delegates events to this.$el and this
}

emitter(View.prototype);

View.prototype.render = function () {
	var $title = this.$el.querySelector('label'),
		$toggle = this.$el.querySelector('.toggle');

	if (this.model.completed()) {
		classes(this.$el).add('completed');
	} else {
		classes(this.$el).remove('completed');
	}

	$toggle.checked = this.model.completed();
	
	$title.textContent = this.model.title();

	return this.$el;
};

View.prototype.bind = function () {
	this.events.bind('change .toggle', 'toggle_completed');
	this.events.bind('click .destroy', 'destroy'); 
	this.events.bind('dblclick label', 'edit');
	this.events.bind('blur .edit', 'commit', true);
	this.events.bind('keyup .edit', 'keyup_edit');
};

View.prototype.toggle_completed = function () {
	var completed = !this.model.completed();
	this.model.completed(completed);
};

View.prototype.edit = function () {
	var $edit = this.$el.querySelector('.edit');

	classes(this.$el).add('editing');
	$edit.value = this.model.title();
	$edit.focus();
};

View.prototype.keyup_edit = function (e) {
	if (e.keyCode === ENTER_KEY) {
		this.commit();
		return;
	}

	if (e.keyCode === ESCAPE_KEY) {
		this.revert();
	}
};

View.prototype.commit = function () {
	// Note: The blur handler is fired when using escape/enter, so this method 
	// is always called when either of these keys are used. The other examples 
	// have the same issue, so I just made sure .revert() reverts the input 
	// value, so .commit() simply sets the title to the previous value.

	// Other solutions:
	// * Maintain state (i.e. 'reverting') after keyup and use this in .commit()
	// * Unbind the blur event inside the keyup handler, then rebind later.

	var title = this.$el.querySelector('.edit').value.trim();

	if (!title) {
		this.destroy();
		return; // short-circuit
	}

	this.model.title(title);
	classes(this.$el).remove('editing');
	this.render();
};

View.prototype.revert = function () {
	classes(this.$el).remove('editing');

	// Focus events will be fired as well, so reset the input
	this.$el.querySelector('.edit').value = this.model.title();
	this.render();
};

View.prototype.destroy = function () {
	this.model.emit('destroy', this.model);
};

module.exports = {
	View: View,
	Model: require('./model.js')
};
