const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const fs = require("fs");

const htmlPageNames = fs.readdirSync("./src/pages");
const multipleHTMLPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}/${name}.html`,
    filename: `pages/${name}.html`,
    chunks: [`${name} `],
  });
});

let multipleJS = {
  main: "./src/index.ts",
};

htmlPageNames.forEach((name) => {
  multipleJS = Object.defineProperty(multipleJS, name, {
    value: `./src/pages/${name}/${name}.ts`,
    writable: true,
    enumerable: true,
    configurable: true,
  });
});

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin()],
  },
  entry: multipleJS,
  output: {
    filename: "js/[name].[contentHash].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: true,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["main"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
    new MinifyPlugin(),
  ].concat(multipleHTMLPlugins),
};
