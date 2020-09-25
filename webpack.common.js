const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.(c)ss$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
        }),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: devMode ? '[name].[contenthash].css' : '[name].css',
            chunkFilename: devMode ? '[id].[contenthash].css' : '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/'),
                to: path.resolve(__dirname, 'dist/assets'),
            }, {
                from: path.resolve(__dirname, 'src/api/'),
                to: path.resolve(__dirname, 'dist/api'),
            }, {
                from: path.resolve(__dirname, 'src/component/'),
                to: path.resolve(__dirname, 'dist/component'),
            }],
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, 'src/assets/images/logo/logo-resto.png'),
            mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
            devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default 
            favicons: {
                appName: 'my-app',
                appDescription: 'My awesome App',
                developerName: 'Me',
                developerURL: null, // prevent retrieving from the nearest package.json
                background: '#ddd',
                theme_color: '#333',
                icons: {
                    coast: false,
                    yandex: false
                }
            }
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
        }),
    ],
};