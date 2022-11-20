const { src, dest, watch, series, gulp } = require('gulp');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const exec = require('child_process').exec; // run command-line programs from gulp
const execSync = require('child_process').execSync; // command-line reports

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

// Watch for netlify deployment
function netlify(done) {
  return new Promise(function (resolve, reject) {
    console.log(execSync('netlify watch').toString());
    resolve();
  });
}

// Preview Deployment
function netlifyOpen(done) {
  return exec('netlify open:site');
  done();
}

// Deploy command
exports.deploy = series(netlify, netlifyOpen);

// default gulp task
exports.default = series(
  assetsTask,
  cssTask,
  jsTask,
  browsersyncServe,
  watchTask
);
