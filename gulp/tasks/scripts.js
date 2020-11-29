import gulp from 'gulp'
import webpack from 'webpack'
import webpackConf from '../../webpack.config.js'
import { modernizr } from './modernizr.js'
const { series } = gulp

export const bundle = (cb) => {
  webpack(webpackConf, function (err, stats) {
    if (err) {
      console.log(err.toString())
    }

    console.log(stats.toString())
    cb()
  })
}

export const scripts = (mode) => {
  if (mode === 'prod') {
    webpackConf.optimization.minimize = true
    webpackConf.mode = 'production'
  } else if (mode === 'dev') {
    webpackConf.optimization.minimize = false
    webpackConf.mode = 'development'
  }

  return series(modernizr, bundle)
}
