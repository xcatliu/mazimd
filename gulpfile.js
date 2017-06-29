const exec = require('child_process').exec;
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyes, console);

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_DIR = path.resolve(__dirname, 'src');
const LIB_DIR = path.resolve(__dirname, 'lib');
const PUBLIC_DIR = path.resolve(__dirname, 'docs');

gulp.task('default', () => {
  runSequence('build', 'serve');

  gulp.watch(`${SRC_DIR}/views/pages/new/index.ts`, ['build:browserify']);
  gulp.watch(`${SRC_DIR}/views/**/*.css`, ['build:copy-css']);
});

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'clean:public', 'build:ts', 'build:copy-vendor', 'build:copy-hbs', 'build:copy-css', 'build:browserify', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(LIB_DIR)));

gulp.task('build:copy-vendor', (callback) => {
  gulp.src([
    `${SRC_DIR}/vendor/**/*`,
  ]).pipe(gulp.dest(`${PUBLIC_DIR}/vendor`))
  .on('end', callback);
});

gulp.task('build:copy-hbs', (callback) => {
  gulp.src([
    `${SRC_DIR}/views/**/*.hbs`,
  ]).pipe(gulp.dest(`${LIB_DIR}/views`))
  .on('end', callback);
});

gulp.task('build:copy-css', (callback) => {
  gulp.src([
    `${SRC_DIR}/views/**/*.css`,
  ]).pipe(gulp.dest(`${PUBLIC_DIR}/css`))
  .on('end', callback);
});

gulp.task('build:browserify', () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: [`${SRC_DIR}/views/pages/new/index.ts`],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(minify())
  .on('error', function (err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(`${PUBLIC_DIR}/js/pages/new`));
});

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});

gulp.task('clean:public', () => {
  rimraf.sync(`${PUBLIC_DIR}/*`);
});

gulp.task('serve', () => {
  const cp = exec('node lib/app');
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
});

process.on('SIGINT', () => {
  console.log('Successfully closed ' + process.pid);
  console.log('Goodbye!');
  process.exit(0);
});
