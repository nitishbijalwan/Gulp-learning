var gulp = require('gulp');
var args=require('yargs').argv;
var $=require('gulp-load-plugins')({lazy:true});
var config=require('./gulp.config')();

// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var util=require('gulp-util');
// var gulpPrint=require('gulp-print');
// var gulpIf=require('gulp-if');


gulp.task('vet', function () {
    log('analyzing the soruce files using JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose,$.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish',{verbose:true}))
        .pipe($.jshint.reporter('fail'));

});

gulp.task('styles',function () {
    log('compiling less-->css');
    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
         .pipe($.autoprefixer({browsers:['last 2 version','> 5%']}))
         .pipe(gulp.dest('www/'));
       
});

gulp.task('less-watcher',function () {
    gulp.watch([config.less],['styles']);
});

function errorLogger(error) {
    log(error);
}

function log(msg) {
    if (typeof(msg)==='object') {
        for (var item  in msg) {
            if (Object.hasOwnProperty(item))
            {
            $.util.log($.util.colors.yellow(msg[item]));   
            }
        }
    }
    else   {
        $.util.log($.util.colors.yellow(msg));
    }
}