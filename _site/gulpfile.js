const { src, dest, watch, series, parallel } = require('gulp');
const browser = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function css() {
    return src('src/scss/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            // outputStyle: 'compressed'
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('src/css'))
        .pipe(dest('_site/src/css'))
        // browser sync의 특수 기능인 스트림 기능 사용
        .pipe(browser.stream());
}

function server() {
    browser.init({
        // inject css changes without the page being reloaded
        injectChanges: true,
        // proxy
        proxy: "127.0.0.1:4000",
        // the port
        port: 1234
    });
    watch('src/scss/**/*.scss', css);
    // watch('_site/src/css/**/*.css').on('change', browser.reload);
    watch('_site/**/*.html').on('change', browser.reload);
}

exports.css = css;
exports.server = server;

// default
exports.default = series(
    css, server
);

// build
// exports.build = series( series(clean, parallel(css, javascript)) );