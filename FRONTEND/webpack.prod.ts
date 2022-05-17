// @ts-ignore
const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    app: path.resolve(__dirname, "src/App.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "~": path.resolve(__dirname),
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    moment: "moment",
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
              plugins: ["@babel/plugin-transform-runtime"],
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
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: ["url-loader", "svgo-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
    // new FaviconsWebpackPlugin("./public/favicon.ico"),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}
