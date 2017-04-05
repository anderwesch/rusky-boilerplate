"use strict";

const gulp = require('gulp');
const uglify = require("gulp-uglify");
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const jeet = require('jeet');
const rupture = require('rupture');
const koutoSwiss = require('kouto-swiss');
const prefixer = require('autoprefixer-stylus');

const srcPaths = {
    js: 'src/js/*.js',
    css: 'src/styl/main.styl',
    php: 'src/*.php',
    img: 'src/img/**/*'
};

const buildPaths = {
    build: 'build/**/*',
    js: 'build/js/',
    css: 'build/css/',
    php: 'build/',
    img: 'build/img'
};

gulp.task('css', () => {
    return gulp.src(srcPaths.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [koutoSwiss(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildPaths.css));
});

gulp.task('js', () => {
    return gulp.src(srcPaths.js)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPaths.js));
});

gulp.task('img', () => {
    return gulp.src(srcPaths.img)
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(buildPaths.img));
});

gulp.task('php', () => {
    return gulp.src(srcPaths.php)
        .pipe(plumber())
        .pipe(gulp.dest(buildPaths.php));
});

gulp.task('build', ['css', 'js', 'img', 'php']);