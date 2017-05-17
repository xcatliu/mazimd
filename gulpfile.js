const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_VIEWS_DIR = path.resolve(__dirname, 'src/views');
const LIB_VIEWS_DIR = path.resolve(__dirname, 'lib/views');

gulp.task('build', (callback) => {
  runSequence('build:ts', 'build:views', callback);
});

gulp.task('build:views', () =>
  gulp.src(`${SRC_VIEWS_DIR}/**/*`)
    .pipe(gulp.dest(`${LIB_VIEWS_DIR}/`)));

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('lib')));
