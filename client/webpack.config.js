const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/transform-runtime'],
                },
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|woff|eot|woff2)$/,
                use: ['file-loader'],
            },

            // // BREAKS ALL IMAGES
            // {
            //     test: /\.(woff|woff2)$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8192,
            //             },
            //         },
            //     ],
            // },
        ],
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
        },
    },
    devServer: {
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
    ],
};
