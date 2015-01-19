/*jslint node: true, sloppy:true */

var gulp = require('gulp'),
	duo = require('./duo-build.js'),
    through = require('through2'),
	path = require('path'),
    paths = {
        scripts: ['app.js'],
        styles: ['todo-list/*.css'],
        images: ['src/*.png', 'src/**/*.png']
    },
	less = require('gulp-less');

function build_with_duo() {
    return through.obj(function (file, enc, done) {
	    var root = path.join(__dirname);
    	duo(root, file.path, function (err, src) {
            if (err) {
                return done(err);
            }
            file.contents = new Buffer(src, 'utf8');
            return done(null, file);
        });
    });
}

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(build_with_duo())
        .pipe(gulp.dest('js/'));
});

gulp.task('styles', function () {
	gulp.src(paths.styles)
		.pipe(less())
		.pipe(gulp.dest('css/'));
});

gulp.task('default', ['scripts', 'styles']);
//gulp.start('default');
