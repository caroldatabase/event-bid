// Load plugins
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Path
const path = {
    sassSrc:   './src/assets/scss/**/*.scss',
    cssDist:   './app/css/',
};


// Sass
gulp.task('sass', () => {
    return gulp.src(path.sassSrc)
        .pipe(sass({sourceComments: false, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer( "last 2 versions", "> 10%", "ie 9"))
        .pipe(gulp.dest(path.cssDist));
});


// Sass
gulp.task('scss', () => {
    return gulp.src(path.sassSrc)
        .pipe(sass({sourceComments: true}).on('error', sass.logError))
        .pipe(autoprefixer(["last 10 versions", "> 10%", "ie 8","ie 9"]))
        .pipe(gulp.dest(path.cssDist));
});

// watch
gulp.task('default', ['scss'], () => {
    gulp.watch([path.sassSrc, './src/assets/scss/**/*'], ['scss']);
});

// Default
gulp.task('build', ['sass']);
