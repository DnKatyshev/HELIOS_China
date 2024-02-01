const {src, dest} = require('gulp'),

gulp = require('gulp'), // подключаем Gulp через require
include = require('gulp-include'), // сборка HTML (header, footer..)
sass = require('gulp-sass')(require('sass')), // плагин для компиляции scss
sourceMaps = require('gulp-sourcemaps'), // нахождение строк в dev-tools

uglify = require('gulp-uglify-es').default, // плагин для сжатия JS файлов
concat = require('gulp-concat'), // плагин для переименования файлов
cleancss = require('gulp-clean-css'), // убирает комментарии в стилях

// IMAGES
imageMin = require('gulp-imagemin'), // сжатие картинок + в новые форматы
webp = require('gulp-webp'),
changed = require('gulp-changed'), // чтобы плагины применялись только к новым файлам
webhtml = require('gulp-webp-html'),
webcss = require('gulp-webp-css'),
// FONTS
fonter = require('gulp-fonter'),
ttf2woff2 = require('gulp-ttf2woff2'),

browserSync = require('browser-sync').create(),
clean = require('gulp-clean'), // возмож-сть удаления папки dist, работа с файл.сист
fs = require('fs')

// import gulp from 'gulp'; // подключаем Gulp через require
// import include from 'gulp-include'; // сборка HTML (header, footer..)
// import sass from 'gulp-sass'; // плагин для компиляции scss
// import sourceMaps from 'gulp-sourcemaps'; // нахождение строк в dev-tools

// import uglify from 'gulp-uglify-es'; // плагин для сжатия JS файлов
// import concat from 'gulp-concat'; // плагин для переименования файлов
// import cleancss from 'gulp-clean-css'; // убирает комментарии в стилях
// import autoprefixer from 'gulp-autoprefixer';

// // IMAGES
// import imageMin from 'gulp-imagemin';  // сжатие картинок + в новые форматы
// import webp from 'gulp-webp';
// import changed from 'gulp-changed'; // чтобы плагины применялись только к новым файлам 
// import webhtml from 'gulp-webp-html';
// import webcss from 'gulp-webp-css';

// // FONTS
// import fonter from 'gulp-fonter';
// import ttf2woff2 from 'gulp-ttf2woff2';

// import clean from 'gulp-clean'; // возмож-сть удаления папки dist, работа с файл.сист


function images(){
    return src('app/images/**/*')
    .pipe(changed('dist/images/**/*'))
    .pipe(webp())
 
    .pipe(src('app/images/**/*'))
    .pipe(changed('dist/images/**/*'))
    .pipe(imageMin({verbose: true}))

    .pipe(dest('dist/images/'))

}

function html(){
    return src('app/**/*.html')
    .pipe(include({
        includePaths: 'dist'
    }))
    .pipe(webhtml())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Функции для компиляции стилей
function style(){
    return src('app/scss/base.scss') 
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(concat('base.css'))
    .pipe(webcss())
    .pipe(sourceMaps.write('.'))
    .pipe(dest('dist/css')) 
    .pipe(browserSync.stream());
}
function style2(){
    return src('app/scss/pages/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(webcss())
    .pipe(sourceMaps.write('.'))
    .pipe(dest('dist/css/pages-style')) 
    .pipe(browserSync.stream());
}
function style3(){
    return src('app/scss/components/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(webcss())
    .pipe(sourceMaps.write('.'))
    .pipe(dest('dist/css/components')) 
    .pipe(browserSync.stream());
}
// Функции для компиляции стилей


function minjs(){
    return src('app/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}
function extraJS(){
    return src('app/js/js-extra-settings/*.js')
    .pipe(dest('dist//js/js-extra-settings'))
}

function fonts(){
    return src('app/fonts/*')
    .pipe(fonter({formats: ['woff', 'ttf']}))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
}

function cleaner(done){
    if (fs.existsSync('dist/')){  // Таск для удаления папки dist
        return src('dist',{read: false}).pipe(clean())
    }
    done()
}



function watching(){   
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(('dist/*.html', 'dist/components/*.html').on('change', browserSync.reload))
    gulp.watch(['app/*.html', 'app/components/*.html'], html)
    gulp.watch(['app/scss/**/*.scss'], gulp.series(style, style2, style3)) //,browserSync
    gulp.watch(['app/imgages/**/*'], images)
    gulp.watch(['app/js/**/*.js'], minjs)
    gulp.watch(['app/fonts/*'], fonts)
}

exports.html = html
exports.style = style
exports.style2 = style2
exports.style3 = style3
exports.minjs = minjs
exports.extraJS = extraJS
exports.images = images
exports.fonts = fonts
exports.cleaner = cleaner
exports.watching = watching

exports.default = gulp.series(
    cleaner,
    gulp.parallel(html, style, style2, style3, minjs, extraJS, images, fonts), 
    gulp.parallel(watching)
)

