import gulp from 'gulp'
import modern from 'gulp-modernizr'
const { src, dest } = gulp

export const modernizr = () => {
  return src([
    './app/assets/styles/**/*.{scss,css}',
    './app/assets/scripts/**/*.js',
  ])
    .pipe(
      modern({
        options: ['setClasses'],
      })
    )
    .pipe(dest('./app/temp/scripts'))
}
