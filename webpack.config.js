const path = require('path');

module.exports = {
    entry: './src/app/app.module.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 8080,
        publicPath: "/dist/",

    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }

        ]
    }
};