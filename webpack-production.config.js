/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // Could also be write as follow:
                    // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: { 
                                modules: true, 
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    ]
                }),
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // Could also be write as follow:
                    // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'less-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
        new HtmlWebpackPlugin({
            title: 'Game of Life [DEV Challenge]',
            minify: {
                collapseWhiteSpace: true
            },
            template: './src/index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new ProgressBarPlugin({ format: '  Building Game of Life [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)', clear: false }),
    ]
};
    