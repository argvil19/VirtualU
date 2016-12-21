module.exports = {
    entry: './client/index.js',
    output: {
        path: './client/',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                  presets: [["es2015","react"]],
                  plugins: ['transform-runtime']
                },
            },
            { test: /\.css$/, loader: "style!css" }
        ],
    },
};

