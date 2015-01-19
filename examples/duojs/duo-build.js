/*jslint node: true, sloppy:true */

var Duo = require('duo'),
	path = require('path');

module.exports = function (root, boot_file, done) {
	var build = new Duo(root);
	build.entry(boot_file);
	build.development(true);
	//build.installTo(path.join('..', 'vendor'));
	//build.buildTo(path.join('..', 'static'));

	build.run(function (err, src) {
		if (err) console.error(err);
		done(null, src);
	});
};
