/*jslint browser:true */

/**
 * English translations are always bundled into the JavaScript. This allows the 
 * UI to be rendered on the first unprimed page load without waiting for 
 * translation files to load.
 *
 * To add new languages:
 * 	* Generate new JSON (see Makefile)
 * 	* Add a UI element to change languages
 * 	* When the user changes language, load the JSON and store it in localStorage
 * 	* Reload the page with some flag indicating the new language
 * 	* In this module, check the flag and load corresponding messages from localStorage
 *
 * 	This should allow primed pageloads to immediately render in the selected language.
 */

var en_US = require('./en_US/messages.json'),
	Jed = require('SlexAxton/Jed:jed.js');

module.exports = (function (global) {
	return global._ || new Jed({
		locale_data: {
			"messages": en_US
		}
	});
}(window));
