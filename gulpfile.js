// Dependencies
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	uglify = require('gulp-uglify'),
	del = require('del');

// SASS task
gulp.task('sass', function() {
	return gulp.src('assets/scss/**/*.scss')							// Set SASS file to compile
	.pipe(sass())														// Compile SASS to CSS
	.pipe(gulp.dest('css'))												// Save 'style.css' in 'css' folder
	.pipe(rename({suffix: '.min'}))										// Add '.min' suffix to filename
	.pipe(minify())														// Minify CSS
	.pipe(gulp.dest('css'))												// Dupicate 'style.min.css' to 'css' folder
});

// JS task
gulp.task('js', function() {

	return gulp.src([
		'assets/js/**/*.js',											// Set JS file to compile
		'!assets/js/scripts.js',										// Set JS file to ignore in compile
		'!assets/js/scripts.min.js'										// Set JS file to ignore in compile
	])

	.pipe(order([
		"assets/js/vendor_scripts/*.js",								// Compile 'vendor_scripts' JS files first
		"assets/js/site_scripts/scripts.js"								// Then compile 'site_scripts' JS fiels
	], { base: './' }))													// Set the root folder for the above directories to be correctly targeted

	.pipe(concat('scripts.js'))											// Concatinate all scripts into one 'scripts.js' file
	.pipe(gulp.dest('js'))												// Save 'scripts.js' in 'js' folder
	.pipe(rename({suffix: '.min'}))										// Add '.min' suffix to filename
	.pipe(uglify())														// Minify JS
	.pipe(gulp.dest('js'))												// Save 'scripts.min.js' to 'js'
});

// Clean task
gulp.task('clean', function() {
	del([
		'css/style.css',												// Delete 'style.css' in the 'css' folder
		'css/style.min.css',											// Delete 'style.min.css' in the 'css' folder
		'js/scripts.js',												// Delete 'scripts.js' in the 'js' folder
		'js/scripts.min.js',											// Delete 'scripts.min.js' in the 'js' folder
	])
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('sass', 'js');											// Run 'sass' and 'js' tasks
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('assets/css/scss/**/*.scss', ['sass']);					// Watch for changes in 'assets/css/scss' folder
	gulp.watch('assets/js/site_scripts/**/*.js', ['js']);				// Watch for changes in 'assets/js/site_scripts' folder
	gulp.watch('assets/js/vendor_scripts/**/*.js', ['js']);				// Watch for changes in 'assets/js/vendor_scripts' folder
});