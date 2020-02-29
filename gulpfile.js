const { src, dest, watch, series, parallel } = require('gulp');
const browser = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const baseDir = 'gnuboard';
const baseThemeDir = 'gnuboard/theme/bs4_v3.0_siimple';

function css() {
    return src(baseThemeDir+'/scss/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            // outputStyle: 'compressed'
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(baseThemeDir+'/css'))
        // browser sync의 특수 기능인 스트림 기능 사용
        .pipe(browser.stream());
}

function server() {
    browser.init({
        // inject css changes without the page being reloaded
        injectChanges: true,
        // proxy
        proxy: "localhost:8002",
        // the port
        port: 1234
    });
    watch(baseThemeDir+'/scss/**/*.scss', css);
    watch(baseThemeDir+'/css/**/*.css').on('change', browser.reload);
    watch(baseThemeDir+'/**/*.php').on('change', browser.reload);
    watch(baseDir+'/pages/**/*.php').on('change', browser.reload);
}

exports.css = css;
exports.server = server;

// default
exports.default = series(
    css, server
);

// build
// exports.build = series( series(clean, parallel(css, javascript)) );