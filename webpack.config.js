const path = require('path');


module.exports = {
  mode: "development",
  target: ["web", "es5"],
  entry: './client/src/index.js',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js'
  },

  module: {

    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: [
          "babel-loader",
          "source-map-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]

  }
}