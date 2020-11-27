import gulp from 'gulp'
import watcher from 'gulp-watch'
import browserSync, { reload } from 'browser-sync'
import { styles } from './styles.js'
import { scripts } from './scripts.js'
const { series, src, dest } = gulp
const bs = browserSync.create('My Server')

const reloadRequest = (cb) => {
  bs.reload()
  cb()
}

export const watch = (cb) => {
  watcher('./app/index.html', series(reloadRequest))
  watcher('./app/assets/styles/**/*.scss', series(styles, cssInject))
  watcher('./app/assets/scripts/**/*.js', series(scripts, reloadRequest))
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
