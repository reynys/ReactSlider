/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});
