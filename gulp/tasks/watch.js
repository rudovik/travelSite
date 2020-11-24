import gulp from 'gulp'
import watcher from 'gulp-watch'
import browserSync from 'browser-sync'
import { styles } from './styles.js'
const { series, src, dest } = gulp
const bs = browserSync.create('My Server')

export const watch = (cb) => {
  watcher('./app/index.html', bs.reload)
  watcher('./app/assets/styles/**/*.scss', series(styles, cssInject))
  bs.init(
    {
      server: {
        baseDir: 'app',
      },
    },
    cb
  )
}

export const cssInject = () => {
  return src('./app/temp/styles/styles.css').pipe(bs.stream())
}
