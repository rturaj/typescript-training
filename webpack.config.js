const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
  },
  devServer: {
    serveIndex: true,
    port: 4000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
