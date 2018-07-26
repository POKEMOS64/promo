var gulp = require('gulp'),
		del = require('del'),
		clean = require('gulp-clean'),
		gutil = require('gulp-util'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		count = require('gulp-count'),
		cssnano = require('gulp-cssnano'),
		autoprefixer = require('gulp-autoprefixer'),
		livereload = require('gulp-livereload'),
		pugBeautifly = require('gulp-pug-beautify'),
		size = require('gulp-size'),
		pug = require('gulp-pug'),
		plumber = require('gulp-plumber'),
		htmlbeautify = require('gulp-html-beautify'),
		imagemin = require('gulp-imagemin'),
		browserSync = require('browser-sync'),
		rename = require('gulp-rename'),
		watch = require('gulp-watch'),
		sass = require('gulp-sass'),
		webp = require('gulp-webp');
		
		
gulp.task('sass',function(){
	return gulp.src(['app/sass/**/*.sass','app/scss/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['Last 10 versions', '>1%', 'ie 8'], {cascade:true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))	
});

gulp.task('htmlbeautify', function(){
	var options = (
		{indentSize: 2}
	);
	gulp.src('app/*.html')
		.pipe(htmlbeautifly(options))
		.pipe(gulp.dest('app'))
})

gulp.task('pug', function(){
	return gulp.src('app/pug/**/*.pug')
		.pipe(plumber())
		.pipe(pug(
			{pretty: true}
		))
		.pipe(gulp.dest('app'))
		.pipe(htmlbeautify())
		.pipe(browserSync.stream())
});

gulp.task('css-libs', ["sass"], function(){
	return gulp.src(['app/css/style.css','app/css/path.css'])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css'));	
});

gulp.task('img', function(){
	return gulp.src('app/img/*')
		.pipe(webp())
		.pipe(size())
		.pipe(gulp.dest('app/image'))
		
});
	
gulp.task('clean', function(){
	return del.sync('build')
	return gulp.src('build',{read: false})
		.pipe(clean());
});

gulp.task('vendor',function(){
	return gulp.src('app/vendor/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('app/js'))
		.pipe(uglify())
		.pipe(rename('vendor.min.js'))
		.pipe(size())
		.pipe(gulp.dest('app/js'))
		.on('error', gutil.log);
});

gulp.task('copy', function(){
	return gulp.src('app/**.*')
		.pipe(gulp.dest('build'))
		.pipe(count('## app copied'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server : {baseDir : 'app'},
		port : 4560
	});
});

gulp.task("watch", ['browser-sync', 'sass','img'], function(){
	livereload.listen();
	//gulp.watch('app/pug/**/*.pug',['pug']);
	gulp.watch(['app/img/*'], ['img']);
	gulp.watch(['app/sass/**/*.sass'], ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default',['watch']);

gulp.task('build', ['clean', 'img', 'vendor', 'css-libs','copy'], function(){
	var buildCss = gulp.src(['app/image/*'])
		.pipe(gulp.dest('build/image'));
	var buildCss = gulp.src(['app/img/*'])
		.pipe(gulp.dest('build/img'));
	var buildCss = gulp.src(['app/css/**/*.css'])
		.pipe(gulp.dest('build/css'));
	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));
	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('build/js'));
	var buildHtml = gulp.src('app/**/*.html')
		.pipe(gulp.dest('build'));
});