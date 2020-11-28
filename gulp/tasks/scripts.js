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

export const scripts = series(modernizr, bundle)
