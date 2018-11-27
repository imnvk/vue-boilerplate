const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function resolveParameterFile(env) {
    return require('./parameters.' + env);
}

module.exports = function(env, argv) {
    return {
        // stats: "verbose",
        devtool: env === 'development' || env === 'test' ? '#eval' : '#source-map',
        mode: env === 'development' ? 'development' : 'production',
        devServer: {
            inline: true,
            port: 8012
        },
        entry: {
            app: './src/main'
        },
        output: {
            path: resolve('build'),
            filename: '[name].[hash].js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json', '.css'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        plugins: [
            new webpack.DefinePlugin(resolveParameterFile(env)),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: 'WR Statistic',
                template: env === "production" ? 'index_prod.html' : 'index.html'
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    style: { test: /\.css$/, name: "style", chunks: "all" },
                    polyfill: { test: /[\\/]node_modules\/[babel\-polyfill|core\-js]/, name: "polyfill", chunks: "all" }
                }
            },
            occurrenceOrder: true
        },
        module: {
            rules: [
                {
                    test: /\.ts/,
                    loader: 'ts-loader',
                    include: [resolve('src')],
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                {
                    test: /\.vue$/,
                    include: [resolve('src'), /vue-flag-icon/],
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    loader:'file-loader',
                    options: { name: 'assets/[name].[ext]' }
                }
            ]
        }
    }
};
