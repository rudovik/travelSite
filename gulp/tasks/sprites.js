import gulp from 'gulp'
import rename from 'gulp-rename'
import del from 'del'
import svgSprite from 'gulp-svg-sprite'
const { src, dest, series } = gulp

const config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.conf',
        },
      },
    },
  },
}

export const createSprite = () => {
  return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'))
}

export const copySpriteGraphic = () => {
  return src('./app/temp/sprite/css/**/*.svg').pipe(
    dest('./app/assets/images/sprites')
  )
}

export const beginClean = () => {
  return del(['./app/temp/sprite', './app/assets/images/sprites'])
}

export const copySpriteCSS = () => {
  return src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(dest('./app/assets/styles/modules'))
}

export const endClean = () => {
  return del('./app/temp/sprite')
}

export const icons = series(
  beginClean,
  createSprite,
  copySpriteGraphic,
  copySpriteCSS,
  endClean
)
