const {src, dest} = require('gulp'),

gulp = require('gulp'),  // подключаем Gulp через require
include = require('gulp-include'),  // сборка HTML (header, footer..)
sass = require('gulp-sass')(require('sass')), // подключаем плагин для компиляции scss
sourceMaps = require('gulp-sourcemaps'),  // нахождение строк в dev-tools

uglify = require('gulp-uglify-es').default,  // плагин для сжатия JS файлов
concat = require('gulp-concat'),  // подключаем плагин для переименования файлов
cleancss = require('gulp-clean-css'), // типо убирает комментарии в стилях

// IMAGES
imageMin = require('gulp-imagemin'),  // сжатие картинок + в новые форматы
webp = require('gulp-webp'),
changed = require('gulp-changed'),  // чтобы плагины применялись только к новым файлам 
webhtml = require('gulp-webp-html'),
webcss = require('gulp-webp-css'),
// FONTS
fonter = require('gulp-fonter'),
ttf2woff2 = require('gulp-ttf2woff2'),

// Сервер
server = require('gulp-server-livereload'), // подключаем сервер и автообновление

clean = require('gulp-clean'),  // возмож-сть удаления папки dist, работа с файл.сист
fs = require('fs')


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
    return src('app/*.html')
    .pipe(include({
        includePaths: 'app/components/'
    }))
    .pipe(webhtml())
    .pipe(dest('dist'))
}

// Функции для компиляции стилей
function style(){
    return src('app/scss/base.scss') 
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(sourceMaps.write())
    .pipe(concat('base.css'))
    .pipe(webcss())
    .pipe(dest('dist/css')) 
}
function style2(){
    return src('app/scss/pages/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(sourceMaps.write())
    .pipe(webcss())
    .pipe(dest('dist/css/pages-style')) 
}
function style3(){
    return src('app/scss/components/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))  
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(sourceMaps.write())
    .pipe(webcss())
    .pipe(dest('dist/css/components-style')) 
}
// Функции для компиляции стилей


function minjs(){
    return src('app/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('dist/js'))
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


// function host(){
//     return src('dist/pages/index.html')
//     .pipe(server({
//         livereload: true,
//         open: true
//     }))
// }

function cleaner(done){
    if (fs.existsSync('dist/')){  // Таск для удаления папки dist
        return src('dist',{read: false}).pipe(clean())
    }
    done()
}

function watching(){   // Таск для авто-обновления всех тасков
    gulp.watch(['app/*.html', 'app/components/*.html'], html)
    gulp.watch(['app/scss/**/*.scss'], gulp.series(style, style2, style3))
    // gulp.watch(['app/scss/*.scss'], style)
    // gulp.watch(['app/scss/pages/*.scss'], style2)
    // gulp.watch(['app/scss/componets/*.scss'], style3)
    gulp.watch(['app/img/**/*'], images)
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
// exports.host = host
exports.cleaner = cleaner
exports.watching = watching

exports.default = gulp.series(
    cleaner,
    gulp.parallel(html, style, style2, style3, minjs, extraJS, images, fonts), 
    gulp.parallel(watching)
)

