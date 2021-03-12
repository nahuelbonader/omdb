const webpack = require("webpack");
const path = require("path");

const REACT_DIRPATH = path.resolve(__dirname, "src");
const BUILD_DIRPATH = path.resolve(__dirname, "public");

module.exports = () => {
  return {
    mode: "development",
    entry: path.resolve(REACT_DIRPATH, "index.jsx"),
    output: {
      path: path.resolve(BUILD_DIRPATH),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    context: __dirname,
    module: {
      rules: [
        {
          test: /jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-react", "@babel/env"],
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };
};
