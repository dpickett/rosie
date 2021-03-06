const webpack = require('webpack');
const path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnano = require('cssnano');

var extractSassPlugin = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: {
    client: __dirname + "/src/client/main.js",
    style: __dirname + "/src/client/css.js"
  },

  output: {
    path: path.resolve(__dirname, "public/assets/"),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  externals: [
  ],

  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["node_modules", "bower_components"]
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json/, loader: "json" },
      { test: /\.(woff|woff2|eot|ttf)/, loader: "file-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg)/, loader: "file-loader" },
      { test: /\.css$|\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass!postcss?outputStyle=expanded")
      }// { test: /\.(ttf|eot)/, loader: "file" },
    ],
  },

  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions', '> 10% in US', 'ie >= 9'],
      },
      discardComments: {
        removeAll: true,
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true,
    }),
  ],
  plugins: [
    extractSassPlugin,
    // new webpack.ResolverPlugin(
      // new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    // ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  ]

  // plugins: [
    // new webpack.PrefetchPlugin("react"),
    // new webpack.PrefetchPlugin("react-bootstrap"),
    // new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
  // ],
};
