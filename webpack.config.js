const { VueLoaderPlugin } = require('vue-loader');
var BundleTracker = require('webpack-bundle-tracker');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const expressStaticGzip = require('express-static-gzip');
const zlib = require('zlib');

//
// configuration examples taken from
// https://github.com/anibalsanchez/XT-TailwindCSS-Starter
//
//
const devMode = process.env.NODE_ENV === 'development';
const productionMode = !devMode;

const plugins = [
    // new CompressionPlugin({
    //     test: /\.js(\?.*)?$/i,
    //     algorithm: 'gzip',
    //     filename: '[path][base].gz',
    // }),
    // new CompressionPlugin({
    //     filename: '[path][base].br',
    //     algorithm: 'brotliCompress',
    //     test: /\.(js|css|html|svg)$/,
    //     // test: /\.(js)$/,
    //     compressionOptions: {
    //         params: {
    //             [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //         },
    //     },
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     deleteOriginalAssets: false,
    // }),
    new VueLoaderPlugin(),
    new BundleTracker({
        path: __dirname,
        filename: './assets/webpack-stats.json',
    }),
];

if (productionMode) {
    // Copy files
    plugins.push(
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static/css/src/main.css'),
                    to: path.resolve(__dirname, './static/css/prod.css'),
                },
                // {
                //     from: path.resolve(
                //         __dirname,
                //         './node_modules/bootstrap-icons/font/fonts/*'
                //     ),
                //     to: path.resolve(__dirname, './static/fonts'),
                // },
                /*
                 *{
                 *    from: path.resolve(__dirname, './static/js/src/app.js'),
                 *    to: path.resolve(__dirname, './static/js/app.js'),
                 *},
                 */
            ],
        })
    );
}

module.exports = {
    target: 'web',
    context: __dirname,
    mode: process.env.NODE_ENV,
    //watch: true,
    entry: {
        main: './static/js/src/main.js',
    },
    output: {
        filename: 'app.js',
        path: require('path').resolve('./static/js/dist/'),
        // publicPath: '/static_root/webpackbundles/',
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: 'file-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                include: path.resolve('./static/js/src/'),
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.(sa|sc|c)css$/i,
                include: path.resolve('./static/css/src/'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve('./node_modules/bootstrap-icons/font'),
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                include: path.resolve('./node_modules/swiper/'),
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/i,
                include: path.resolve('./node_modules/vue2-datepicker/'),
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/,
                include: path.resolve('./node_modules/tippy.js/dist/'),
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js',
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
        hot: false,
        //proxy: 'http://127.0.0.1:8000',
    },
    plugins: plugins,
    stats: { warnings: false },
    // "jest": {
    //     "moduleFileExtensions": [
    //         "js",
    //         "json",
    //         "vue"
    //     ],
    //     "transform": {
    //         "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    //         ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    //     }
    // }
};
