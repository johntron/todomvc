var classes = require('component/classes'),
	domify = require('component/domify'),
	$template = domify(require('./template.html'));

function View (model) {
	this.model = model;
	this.$el = $template.cloneNode(true); // Clone (deep) to avoid updating original $template
}

View.prototype.render = function () {
	var $title = this.$el.querySelector('label');

	if (this.model.completed()) {
		classes(this.$el).add('completed');
	} else {
		classes(this.$el).remove('completed');
	}

	$title.textContent = this.model.title();

	return this.$el;
};

module.exports = {
	View: View,
	Model: require('./model.js')
};
