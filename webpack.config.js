/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: path.resolve(__dirname, './src/index.js'),
   output: {
       path: path.resolve('production'),
       filename: 'main.js'
   },
   module: {
       rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images',
                    esModule: false
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
       ]
   },
   plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
   ]
};
