const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { argv } = require("process");

const config = {
  entry: {
    app: "./src/js/app.js",
  },

  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: {
      app: {
        name: "chrome",
      },
    },
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],

  resolve: {
    alias: {
      "@model": path.resolve(__dirname, "src/js/model/"),
      "@view": path.resolve(__dirname, "src/js/view/"),
      assets: path.resolve(__dirname, "public/assets/"),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  output: {
    filename: "[name].bundle.js",
    publicPath: "/public",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval-source-map";
  }

  if (argv.mode === "production") {
  }

  return config;
};
