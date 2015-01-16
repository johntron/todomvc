/*jslint browser:true */

var Enumerable = require('component/enumerable'),
	Model = require('/todo').Model;

function Collection(data) {
	this.items = data || [];
}

Enumerable(Collection.prototype);

Collection.prototype.__iterate__ = function () {
	var self = this;

	return {
		length: function () { return self.items.length; },
		get: function (i) { return self.items[i]; }
	};
};

Collection.prototype.length = function () {
	return this.items.length;
};

Collection.prototype.next_order = function () {
	var max = this.max(function (item) {
		return item.order();
	});

	max = Math.max(max, 0);
	return max + 1;
};

Collection.prototype.num_incomplete = function () {
	return this.count(function (todo) {
		return !todo.completed();
	});
};

Collection.prototype.num_complete = function () {
	return this.count(function (todo) {
		return todo.completed();
	});
};

/**
 * @param {Model} item
 */
Collection.prototype.add = function (item) {
	this.items.push(item);
};

/**
 * @param {Model} item
 */
Collection.prototype.remove = function (item) {
	var index = this.indexOf(item);
	this.items.splice(index, 1);
};

Collection.prototype.destroy_completed = function () {
	var self = this;

	this.items = this.items.filter(function (todo, i) {
		if (!todo) {console.log(self.items, i);}
		if (!todo.completed()) {
			return true; // Short-circuit
		}
		
		if (todo.isNew()) {
			todo.emit('destroy');
		} else {
			todo.destroy();
		}

		return false;
	});
};


/**
 * Request all items from localStorage
 * Implemented as async method so it's compatible with AJAX
 * 
 * @param {Function} done callback like: function (err, collection) {}
 */
Collection.all = function (done) {
	var items = window.localStorage.getItem('todos');
	done(null, new Collection(items));
};

module.exports = Collection;
