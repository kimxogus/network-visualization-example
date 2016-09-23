/**
 * Created by Taehyun on 2016-09-23.
 */

const
    path                = require('path'),

    webpack             = require("webpack"),

    CommonsChunkPlugin  = require('webpack/lib/optimize/CommonsChunkPlugin'),

    HtmlWebpackPlugin   = require('html-webpack-plugin'),
    CleanWebpackPlugin  = require('clean-webpack-plugin');


const
    APP_PATH    = './app/',
    DIST_PATH   = './dist/';

module.exports = {
    entry: {
        'vendor'            : ['jquery', 'lodash'],
        'main'              : APP_PATH + 'main.js',
        'd3-network'        : APP_PATH + 'd3-network.js',
        'cytoscape-network' : APP_PATH + 'cytoscape-network.js'
    },

    output: {
        path: DIST_PATH,
        filename: 'js/[name].js'
    },

    module: {
        loaders: [{
            test    : /\.js$/,
            loader  : 'babel-loader',
            exclude : /node_modules/,
            query: {
                presets: ['es2015'],
                cacheDirectory: true
            }
        }, {
            test: /\.css$/,
            loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]'
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }]
    },

    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ['', '.js']
    },

    plugins: [
        new webpack.ProvidePlugin({
            '_'                 : 'lodash',
            '$'                 : 'jquery',
            'jQuery'            : 'jquery',
            'window.jQuery'     : 'jquery',
            'd3'                : 'd3',
            'cytoscape'         : 'cytoscape'
        }),

        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            inject: 'body',
            title: "Awesome Cytoscape",
            filename: "index.html",
            template: "./html/index.html",
            edges: ['css/style.css'],
            chunks: ["vendor", "main"]
        }),
        new HtmlWebpackPlugin({
            title: "Awesome Cytoscape - d3",
            filename: "d3.html",
            template: "./html/network.html",
            chunks: ["vendor", "d3-network"]
        }),
        new HtmlWebpackPlugin({
            title: "Awesome Cytoscape - cytoscape",
            filename: "cytoscape.html",
            template: "./html/network.html",
            chunks: ["vendor", "cytoscape-network"]
        }),

        new CleanWebpackPlugin([DIST_PATH + "*"], {
            verbose: true,
            dry: false
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ExtendedAPIPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],

    devtool: 'eval',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true
    }
};