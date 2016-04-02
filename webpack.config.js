var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    client: __dirname + "/src/client/main.js",
  },

  output: {
    path: path.resolve(__dirname, "public/javascripts"),
    publicPath: '/javascripts',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  externals: [
  ],

  resolve: {
    extensions: ["", ".js", ".jsx"],
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json/, loader: "json" },
      // { test: /\.(woff|woff2)/, loader: "url?limit=100000" },
      { test: /\.(png|jpg|jpeg|gif|svg)/, loader: "url?limit=100000" },
      // { test: /\.(ttf|eot)/, loader: "file" },
    ],
  },

  // plugins: [
    // new webpack.PrefetchPlugin("react"),
    // new webpack.PrefetchPlugin("react-bootstrap"),
    // new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
  // ],
};
