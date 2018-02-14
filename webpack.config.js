var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var plugins = [
    new HtmlWebpackPlugin({
      title: "Photobook",
      inject: false,
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.png')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:  JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
        disable: process.env.NODE_ENV === "development"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'src/assets' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  entry: {
    application: [
      './src/main.js',
      './src/assets/styles/style.scss'
    ]
  },
  output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'build.js'
  },
  node: {
    fs: "empty",
    tls: "empty",
    net: "empty"
   },
   plugins: plugins,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            // vue-loader options go here
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { 
        test: /\.html$/,
        loader: 'html-loader'
        // exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(otf|eot|ttf|woff)$/,
        loader: `file-loader?name=[name].[ext]?[hash]`
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', '.html'],
    // modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      // 'muse-components': 'muse-ui/src',
      '@': resolve('src')
    }
  },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue'
  //   }
  // },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    // module.exports.plugins = (module.exports.plugins || []).concat([
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: '"production"'
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     }),
    //     new webpack.LoaderOptionsPlugin({
    //         minimize: true
    //     })
    // ])
}
