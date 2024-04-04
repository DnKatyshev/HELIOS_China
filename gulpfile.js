// GULP + база
import gulp from 'gulp'; // подключаем Gulp через require
import del from 'del'; // возмож-сть удаления папки dist, работа с файл.сист
import browserSync from 'browser-sync';
const server = browserSync.create();

// HTML JS
import fileInclude from 'gulp-file-include'; // сборка HTML (header, footer..)
import uglify from 'gulp-uglify'; // плагин для сжатия JS файлов
import concat from 'gulp-concat'; // плагин для переименования файлов

// STYLES
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass); // плагин для компиляции scss
import sourceMaps from 'gulp-sourcemaps'; // нахождение строк в dev-tools
import cleancss from 'gulp-clean-css'; // убирает комментарии в стилях

// IMAGES
import imageMin from 'gulp-imagemin';  // сжатие картинок + в новые форматы
import webp from 'gulp-webp';
import changed from 'gulp-changed'; // чтобы плагины применялись только к новым файлам 
import webhtml from 'gulp-webp-html';
import webcss from 'gulp-webp-css';


// FONTS
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';



export function images(){
    return gulp.src('app/images/**/*')
    .pipe(changed('app/images/**/*'))
    .pipe(webp())
 
    .pipe(gulp.src('app/images/**/*'))
    .pipe(changed('dist/images/**/*'))
    .pipe(imageMin({verbose: true}))

    .pipe(gulp.dest('dist/images/'))
}

export function clean(){
    return del(['dist'])
}

export function html(){
    return gulp.src('app/*.html')
    .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
    }))
    // .pipe(webhtml())
    .pipe(gulp.dest('dist'))
    // .pipe(server.stream());
}
export function php(){
    return gulp.src('app/**/*.php')
    .pipe(gulp.dest('dist'))
}

// Функции для компиляции стилей
export function style(){
    return gulp.src('app/scss/pages/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass())  
    // .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(webcss())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/css/pages-style')) 
}
export function style2(){
    return gulp.src('app/scss/components/*.scss')  
    .pipe(sourceMaps.init())
    .pipe(sass())  
    // .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(webcss())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/css/components')) 
}
// Функции для компиляции стилей


export function minjs(){
    return gulp.src('app/js/**/*.{js,json}')
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
}

export function fonts(){
    return gulp.src('app/fonts/*')
    .pipe(fonter({formats: ['woff', 'ttf']}))
    .pipe(gulp.src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(gulp.dest('dist/fonts'))
}




export function watching(){   
    // browserSync.init({
    //     server: {
    //         baseDir: "./dist"
    //     }
    // });
    gulp.watch(['app/**/*.html'], html)
    gulp.watch(['app/**/*.php'], php)
    gulp.watch(['app/scss/**/*.scss'], gulp.series(style, style2))
    gulp.watch(['app/images/**/*'], images)
    gulp.watch(['app/js/**/*.{js,json}'], minjs)
    gulp.watch(['app/fonts/*'], fonts)
}

export default gulp.series(
    clean,
    gulp.parallel(html, php, style, style2, minjs, images, fonts), 
    gulp.parallel(watching)
)

