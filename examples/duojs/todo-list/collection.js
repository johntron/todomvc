/*jslint browser:true */

var Enumerable = require('component/enumerable'),
	Emitter = require('component/emitter'),
	Model = require('/todo').Model;

function Collection(data) {
	data = data || [];
	
	this.items = [];

	data.forEach(function (todo) {
		this.add(todo, true);
	}, this);
}

Enumerable(Collection.prototype);
Emitter(Collection.prototype);

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
Collection.prototype.add = function (item, silent) {
	this.items.push(item);

	item.on('change', this.emit.bind(this, 'change', this));
	item.on('destroy', this.remove.bind(this, item));

	if (!silent) {
		this.emit('add', item, this);
	}
};

/**
 * @param {Model} item
 */
Collection.prototype.remove = function (item) {
	var index = this.indexOf(item);
	this.items.splice(index, 1);

	this.emit('remove', item, this);
};

Collection.prototype.active = function () {
	return this.select(function (todo) {
		return !todo.completed();
	});
};
Collection.prototype.completed = function () {
	return this.select(function (todo) {
		return todo.completed();
	});
};

Collection.prototype.destroy_completed = function () {
	this.items.slice(0).forEach(function (todo, i) {
		if (!todo.completed()) {
			return; // Short-circuit
		}
		
		if (todo.isNew()) {
			todo.emit('destroy');
		} else {
			todo.destroy();
		}
	});
};

/**
 * Save to localStorage
 */
Collection.prototype.save = function () {
	var data = {}; // Using an [] would fill localStorage with null values for indices that have no Todo associated with them
	this.items.forEach(function (todo) {
		data[todo.order() - 1] = todo.toJSON();
	});
	window.localStorage.setItem('todos-duojs', JSON.stringify(data));
};

/**
 * Request all items from localStorage
 * Implemented as async method so it's compatible with AJAX
 * 
 * @param {Function} done callback like: function (err, collection) {}
 */
Collection.all = function (done) {
	var data = window.localStorage.getItem('todos-duojs'),
		todos = [];

	if (!data) {
		return done(null, new Collection()); // Short-circuit
	}

	data = JSON.parse(data);

	// Convert from indexed object to array
	Object.keys(data).forEach(function (index) {
		todos[index] = new Model(data[index]);
	});
	done(null, new Collection(todos));
};

module.exports = Collection;
