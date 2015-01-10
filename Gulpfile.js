var browserify = require('browserify'),
    gulp = require('gulp'),
    // watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify');

var liveServer = require('live-server');

gulp.task('browserify', function() {
  var b = browserify({ insertGlobals: true });
  b.transform([reactify]);
  b.add('./src/main.js');

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('watch',function(){
  return gulp.watch('src/*.js',['browserify']);
});

gulp.task('build',['browserify'],function(){
  return gulp.src('public/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('server',function(){
  liveServer.start(8080,"public",false);
});

// gulp.task('default',['browserify']);
gulp.task('default',['server','watch']);

