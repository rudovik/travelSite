import gulp from 'gulp'
import webpack from 'webpack'
import webpackConf from '../../webpack.config.js'

export const scripts = (cb) => {
  webpack(webpackConf, function (err, stats) {
    if (err) {
      console.log(err.toString())
    }

    console.log(stats.toString())
    cb()
  })
}
