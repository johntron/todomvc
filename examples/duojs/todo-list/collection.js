/*jslint browser:true */

var Enumerable = require('component/enumerable'),
	Model = require('/todo').Model;

function Collection(data) {
	data = data || [];

	data.forEach(function (item) {
		this[item.order] = new Model(item);
	}, this);
}

Enumerable(Collection.prototype);

/**
 * @param {Model} item
 */
Collection.prototype.add = function (item) {
	this[item.order()] = new Model(item);
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
