const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './img',
          publicPath: '../img',
          useRelativePaths: true,
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/styles.css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $:' jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery'
    }),
    new CopyWebpackPlugin([
      { from:'./src/img',to:'./img' },
    ]),
    new PrettierPlugin({
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      encoding: 'utf-8',
      extensions: [".js"]
    }),
    new ImageminPlugin({
      pngquant: ({quality: '65-90'}),
      plugins: [imageminMozjpeg({quality: 50})],
	  })
  ]
}