var path = require('path'),
    webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    postcss = require('postcss'),
    autoprefixer = require('autoprefixer');

var ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, 'src'),
    DIST_PATH = path.resolve(ROOT_PATH, 'dist'),
    LIBS_PATH = path.resolve(ROOT_PATH, 'libs'),
    TEM_PATH = path.resolve(LIBS_PATH, 'template');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.resolve(SRC_PATH, 'index.jsx'),
        vendors: [
            "antd",
            "axios",
            "babel-polyfill",
            "draft-js",
            "echarts",
            "immutable",
            "lodash",
            "md5",
            "qs",
            "react",
            "react-addons-css-transition-group",
            "react-color",
            "react-datetime",
            "react-dnd",
            "react-dnd-html5-backend",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            "redux-logger",
            "redux-thunk",
        ]
    },
    output: {
        path: DIST_PATH,
        publicPath: '../',
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-[hash:8].chunk.js'
    },
    module: {
        preLoader: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'eslint',
                include: SRC_PATH
            }
        ],
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel',
                include: SRC_PATH
            }, {
                test: /\.(svg|gif|png|jpg)$/,
                loader: 'url-loader?limit=(1024*8)&name=img/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(swf|mp4|ogv|webm)$/,
                loader: 'file-loader?name=video/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(mp3|ogg|wav|m4a)$/,
                loader: 'file-loader?name=audio/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(woff|eot|ttf)$/,
                loader: 'file-loader?name=font/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
                include: ROOT_PATH
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    externals: {
        zepto: '$',
        jquery: '$'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new CleanWebpackPlugin([DIST_PATH], {
            root: '',
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'zepto' || 'jquery',
            zepto: 'zepto',
            jQuery: 'jquery',
            'window.zepto': 'zepto',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin("css/[name]-[hash:8].css"),
        new webpack.optimize.CommonsChunkPlugin({
            filename: "js/[name]-[hash:8].js",
            name: "vendors"
        }),
        new HtmlwebpackPlugin({
            title: 'BI3.0',
            keywords: 'BI3.0',
            description: 'BI3.0',
            filepath: DIST_PATH,
            template: path.resolve(TEM_PATH, 'index.html'),
            chunks: ['index', 'vendors'],
            filename: 'html/index.html',
            inject: 'body'
        })
    ]
};