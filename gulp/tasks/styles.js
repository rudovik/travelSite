import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssvars from 'postcss-simple-vars'
import rename from 'gulp-rename'
import nested from 'postcss-nested'
import scss from 'postcss-scss'
import cssImport from 'postcss-import'
import mixins from 'postcss-mixins'
import hexrgba from 'postcss-hexrgba'
const { series, src, dest } = gulp

export const styles = () => {
  return src('./app/assets/styles/styles.scss')
    .pipe(
      postcss([cssImport, mixins, cssvars(), hexrgba, autoprefixer], {
        parser: scss,
      })
    )
    .pipe(postcss([nested]))
    .pipe(rename('styles.css'))
    .pipe(dest('./app/temp/styles'))
}
