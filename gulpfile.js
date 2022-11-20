const { src, dest, watch, series } = require('gulp');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');

// css task
function cssTask() {
  return src([
    'src/css/reset.css',
    'src/css/fonts.css',
    'src/css/global.css',
    'src/css/compositions.css',
    'src/css/utilities.css',
    'src/css/blocks.css',
    'src/css/exceptions.css  ',
  ])
    .pipe(concat('styles.css'))
    .pipe(dest('dist/css'));
}

// Javascript task
function jsTask() {
  return src('src/js/**/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// assets task (fonts and images)
function assetsTask() {
  return src('src/assets/**').pipe(dest('dist/assets'));
}

// browsersync tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// watch task
function watchTask() {
  watch('*.html', browsersyncReload);

  watch(
    ['src/css/**/*.css', 'src/js/**/*.js'],
    series(cssTask, jsTask),
    browsersyncReload
  );
}

// default gulp task
exports.default = series(
  assetsTask,
  cssTask,
  jsTask,
  browsersyncServe,
  watchTask
);
