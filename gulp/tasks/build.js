import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import del from 'del'
import um from 'gulp-usemin'
import rev from 'gulp-rev'
import cssnano from 'gulp-cssnano'
import { styles } from './styles.js'
import { icons } from './sprites.js'
import { scripts } from './scripts.js'
import browserSync from 'browser-sync'
const bs = browserSync.create('')
const { series, src, dest } = gulp

const previewDist = (cb) => {
  bs.init(
    {
      notify: false,
      server: {
        baseDir: 'docs',
      },
    },
    cb
  )
}

const deleteDistFolder = () => {
  return del('./docs')
}

const optimazeImages = () => {
  return src([
    './app/assets/images/**/*',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*',
  ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(dest('./docs/assets/images'))
}

const copyGeneralFiles = () => {
  const pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
  ]
  return src(pathsToCopy).pipe(dest('./docs'))
}

const usemin = () => {
  return src('./app/index.html')
    .pipe(
      um({
        css: [rev(), cssnano()],
        js: [rev()],
        js1: [rev()],
      })
    )
    .pipe(dest('./docs'))
}

export const build = series(
  deleteDistFolder,
  styles,
  icons,
  scripts('prod'),
  copyGeneralFiles,
  optimazeImages,
  usemin,
  previewDist
)
