module.exports = {
    entry: './client/index.js',
    output: {
        path: './client/',
        filename: "bundle.js"
    },
      module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-runtime']
            }
          }
        ]
      },
    };