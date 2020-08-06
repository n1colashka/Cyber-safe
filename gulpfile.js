let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    webp = require('gulp-webp'),
    imagemin = require('gulp-imagemin');


gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowsersList: ['last 10 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/swiper/swiper-bundle.min.css',
  ])
    .pipe(concat('libs.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/swiper/swiper-bundle.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('webp', function(){
  return gulp.src('app/images/*.jpg')
    .pipe(webp({
      quality: 70
  }))
    .pipe(gulp.dest('app/images'))
});

gulp.task('images', function() {
  return gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/images/min'))
});

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let buildImg = gulp.src('app/images/min/*.*')
    .pipe(gulp.dest('dist/images'));   

});

gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css' ,'sass', 'js', 'browser-sync', 'watch'));