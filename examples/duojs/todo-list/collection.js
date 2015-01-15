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
	this.items.splice(index);
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
