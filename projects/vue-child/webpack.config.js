const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: './projects/vue-child/src/main.js',
  mode: 'development',
  devServer: {
    port: 4208,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, '../../dist/vue-child'),
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'vueChild',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './projects/vue-child/src/App',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './projects/vue-child/public/index.html',
    }),
  ],
};

