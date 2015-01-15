var model = require('component/model');

var Todo = model('Todo');

Todo.attr('order');
Todo.attr('title');
Todo.attr('completed');

module.exports = Todo;
