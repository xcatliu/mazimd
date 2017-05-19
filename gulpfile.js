const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const webpack = require('gulp-webpack');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_VIEWS_DIR = path.resolve(__dirname, 'src/views');
const SRC_PUBLIC_DIR = path.resolve(__dirname, 'src/public');
const LIB_DIR = path.resolve(__dirname, 'lib');
const LIB_VIEWS_DIR = path.resolve(__dirname, 'lib/views');
const PUBLIC_DIR = path.resolve(__dirname, 'lib');

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'clean:public', 'build:ts', 'build:webpack', 'build:views', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('lib')));

gulp.task('build:webpack', () =>
  gulp.src(`${SRC_PUBLIC_DIR}/entry.ts`)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('public/')));

gulp.task('build:views', () =>
  gulp.src(`${SRC_VIEWS_DIR}/**/*`)
    .pipe(gulp.dest(`${LIB_VIEWS_DIR}/`)));

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});

gulp.task('clean:public', () => {
  rimraf.sync(`${PUBLIC_DIR}/*`);
});
