import path from 'path'

export default {
  mode: 'development',
  entry: './app/assets/scripts/App.js',
  output: {
    path: path.resolve(path.resolve(), 'app/temp/scripts'),
    filename: 'App.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
