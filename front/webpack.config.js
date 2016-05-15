var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'components');


module.exports = {
  entry: [
        'webpack/hot/dev-server', // --hot的时候必须加上  --inline时候可以去掉
        path.resolve(BUILD_PATH, 'app.jsx')
    ],
  output: {
    path: ROOT_PATH,
    filename: 'main.js',
    publicPath: "/assets/"
  },
//enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  resolve: {
        extensions: [ '' , '.js' , '.jsx' ]
    },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'react-hmre']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",  // 设置jquery成全局变量
    }),
],
};
