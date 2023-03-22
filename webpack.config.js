const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const webpack = require("webpack");
const Enviroment = process.env.NODE_ENV || "development";
const isDev = Enviroment === "development";
module.exports = {
  mode: Enviroment,
  entry: "./src/index.jsx",
  output: {
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // find out why style loader is not workin?
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["static*.*", "!static1.js"],
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new DashboardPlugin(),
  ],
};
