var classes = require('component/classes'),
	domify = require('component/domify'),
	$template = domify(require('./template.html')),
	delegate = require('component/delegate'),
	emitter = require('component/emitter');

function View (model) {
	this.model = model;
	this.$el = $template.cloneNode(true); // Clone (deep) to avoid updating original $template
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
	delegate.bind(this.$el, '.toggle', 'change', this.toggle_completed.bind(this));
	delegate.bind(this.$el, '.destroy', 'click', this.destroy.bind(this));
};

View.prototype.toggle_completed = function () {
	var completed = !this.model.completed();
	this.model.completed(completed);
};

View.prototype.destroy = function () {
	this.model.emit('destroy', this.model);
};

module.exports = {
	View: View,
	Model: require('./model.js')
};
