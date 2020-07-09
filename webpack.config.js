const path = require("path")

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /vendors/,
        loader: "babel-loader",
      }
    ]
  },

  devtool: 'source-map',
  output: {
    filename: "coco-miniprogram.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: 'commonjs2',
  }
}
