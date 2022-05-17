// @ts-ignore
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {

  mode: "development",
  entry: {
    app: path.resolve(__dirname, "src/App.tsx"),
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "~": path.resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime", "emotion"],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/ ,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
}
