module.exports = {
  entry: './CLIENT/index.js',
  output: {
    filename: 'bundle.js',
    path: './SERVER/public',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
