var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var imagemin        = require("gulp-imagemin");
var reload          = browserSync.reload;
const autoprefixer  = require('gulp-autoprefixer');
var cssmin          = require('gulp-cssmin');
var rename          = require('gulp-rename');

// Save a reference to the `reload` method

//Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch("*.css").on("change", reload);
    gulp.watch("*.css").on("change", autoPrefixer);
    gulp.watch("*.css").on("change", minifyCss);
    gulp.watch("*.html").on("change", imgSquash);
});

function imgSquash() {
  return gulp
        .src("./img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./minified/"))
}

function autoPrefixer() {
  gulp.src('./main.css')
      .pipe(autoprefixer({
          cascade: false
      }))
      .pipe(gulp.dest('dist'))
}

function minifyCss() {
    gulp.src('dist/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
}


// gulp.task("watch", () => {
  // gulp.watch("./img/*", imgSquash)
// });

// gulp.task("default", gulp.series("imgSquash", 'watch'))