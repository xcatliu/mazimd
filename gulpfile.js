const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');

const postcssConfig = [autoprefixer({ browsers: [
  'last 5 iOS versions',
  'last 5 Android versions',
  'last 5 ExplorerMobile versions',
  'last 5 ChromeAndroid versions',
  'last 5 UCAndroid versions',
  'last 5 FirefoxAndroid versions',
  'last 5 OperaMobile versions',
  'last 5 OperaMini versions',
  'last 5 Samsung versions',

  'last 3 Chrome versions',
  'last 3 Firefox versions',
  'last 3 Safari versions',
  'last 3 Edge versions',
] })];

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SITE_DIR = path.resolve(__dirname, 'docs');
const SITE_CSS_DIR = path.resolve(__dirname, 'docs/css');

gulp.task('default', ['build_copy'], () => {
  gulp.watch([
    `${SRC_DIR}/**/*`,
  ], ['build_copy']);
});

gulp.task('build_copy', () => {
  setTimeout(() => {
    runSequence('build', 'copy');
  }, 300);
});

gulp.task('build', [
  'clean:dist',
  'build:mazimd-site:sourcemaps',
  'build:mazimd-site:compressed',
]);

gulp.task('copy', [
  'clean:site_css',
  'copy:site_css',
]);

gulp.task('clean:dist', () => {
  rimraf.sync(`${DIST_DIR}/*`);
});

gulp.task('build:mazimd-site:compressed', ['build:mazimd-site:sourcemaps'], () => gulp.src(`${DIST_DIR}/mazimd-site.css`)
  .pipe(cleanCSS())
  .pipe(rename('mazimd-site.min.css'))
  .pipe(gulp.dest(DIST_DIR)));

gulp.task('build:mazimd-site:sourcemaps', () => gulp.src(`${SRC_DIR}/mazimd-site.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: 'node_modules'
  }).on('error', sass.logError))
  .pipe(postcss(postcssConfig))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(DIST_DIR)));

gulp.task('clean:site_css', () => {
  rimraf.sync(`${SITE_CSS_DIR}/*`);
});

gulp.task('copy:site_css', () => gulp.src(`${DIST_DIR}/*`)
  .pipe(gulp.dest(`${SITE_CSS_DIR}/`)));
