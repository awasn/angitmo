'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat'); // łączy wiele plików w jeden
var uglify = require('gulp-uglify'); // minimalizuje rozmiar pliku
var rename = require("gulp-rename"); // zmienia nazwę pliku

var angularFilesort = require('gulp-angular-filesort'); // sortuje pliki AngularJS aby ich kolejność przy łączeniu była poprawna

// Styles
gulp.task('styles', function () {
	return gulp.src('client/stylesheets/angitmo.css')
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('client/stylesheets'));
});

// Scripts
gulp.task('scripts', function () {
	return gulp.src(['client/app/**/*.js'])
		.pipe(angularFilesort())
		.pipe(concat('angitmo.js'))
		.pipe(gulp.dest('client/javascripts/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('client/javascripts'));
});

gulp.task('default', ['styles', 'scripts']);