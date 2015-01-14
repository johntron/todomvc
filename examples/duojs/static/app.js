(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
var Todo = require('./todo'),
	TodoList = require('./todo-list');

var t = new Todo();

}, {"./todo":2,"./todo-list":3}],
2: [function(require, module, exports) {
module.exports = function Todo () {
	console.log('hello world');
};

}, {}],
3: [function(require, module, exports) {

}, {}]}, {}, {"1":""})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVpcmUuanMiLCJhcHAuanMiLCJ0b2RvL2luZGV4LmpzIiwidG9kby1saXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBvdXRlcihtb2R1bGVzLCBjYWNoZSwgZW50cmllcyl7XG5cbiAgLyoqXG4gICAqIEdsb2JhbFxuICAgKi9cblxuICB2YXIgZ2xvYmFsID0gKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KSgpO1xuXG4gIC8qKlxuICAgKiBSZXF1aXJlIGBuYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtCb29sZWFufSBqdW1wZWRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVxdWlyZShuYW1lLCBqdW1wZWQpe1xuICAgIGlmIChjYWNoZVtuYW1lXSkgcmV0dXJuIGNhY2hlW25hbWVdLmV4cG9ydHM7XG4gICAgaWYgKG1vZHVsZXNbbmFtZV0pIHJldHVybiBjYWxsKG5hbWUsIHJlcXVpcmUpO1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgbW9kdWxlIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIG1vZHVsZSBgaWRgIGFuZCBjYWNoZSBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBjYWxsKGlkLCByZXF1aXJlKXtcbiAgICB2YXIgbSA9IGNhY2hlW2lkXSA9IHsgZXhwb3J0czoge30gfTtcbiAgICB2YXIgbW9kID0gbW9kdWxlc1tpZF07XG4gICAgdmFyIG5hbWUgPSBtb2RbMl07XG4gICAgdmFyIGZuID0gbW9kWzBdO1xuXG4gICAgZm4uY2FsbChtLmV4cG9ydHMsIGZ1bmN0aW9uKHJlcSl7XG4gICAgICB2YXIgZGVwID0gbW9kdWxlc1tpZF1bMV1bcmVxXTtcbiAgICAgIHJldHVybiByZXF1aXJlKGRlcCA/IGRlcCA6IHJlcSk7XG4gICAgfSwgbSwgbS5leHBvcnRzLCBvdXRlciwgbW9kdWxlcywgY2FjaGUsIGVudHJpZXMpO1xuXG4gICAgLy8gZXhwb3NlIGFzIGBuYW1lYC5cbiAgICBpZiAobmFtZSkgY2FjaGVbbmFtZV0gPSBjYWNoZVtpZF07XG5cbiAgICByZXR1cm4gY2FjaGVbaWRdLmV4cG9ydHM7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWlyZSBhbGwgZW50cmllcyBleHBvc2luZyB0aGVtIG9uIGdsb2JhbCBpZiBuZWVkZWQuXG4gICAqL1xuXG4gIGZvciAodmFyIGlkIGluIGVudHJpZXMpIHtcbiAgICBpZiAoZW50cmllc1tpZF0pIHtcbiAgICAgIGdsb2JhbFtlbnRyaWVzW2lkXV0gPSByZXF1aXJlKGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWlyZShpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIER1byBmbGFnLlxuICAgKi9cblxuICByZXF1aXJlLmR1byA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjYWNoZS5cbiAgICovXG5cbiAgcmVxdWlyZS5jYWNoZSA9IGNhY2hlO1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgbW9kdWxlc1xuICAgKi9cblxuICByZXF1aXJlLm1vZHVsZXMgPSBtb2R1bGVzO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gbmV3ZXN0IHJlcXVpcmUuXG4gICAqL1xuXG4gICByZXR1cm4gcmVxdWlyZTtcbn0pIiwidmFyIFRvZG8gPSByZXF1aXJlKCcuL3RvZG8nKSxcblx0VG9kb0xpc3QgPSByZXF1aXJlKCcuL3RvZG8tbGlzdCcpO1xuXG52YXIgdCA9IG5ldyBUb2RvKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRvZG8gKCkge1xuXHRjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKTtcbn07XG4iLG51bGxdfQ==