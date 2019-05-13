const webpack = require('webpack');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const sassThreadLoader = require('thread-loader');
const tsImportPluginFactory = require('ts-import-plugin');

sassThreadLoader.warmup({ workerParallelJobs: 20 }, [
  'sass-loader',
  'less-loader',
  'postcss-loader',
  'css-loader',
  'style-loader',
]);

const antThemeVars = lessToJs(
  fs.readFileSync(path.join(__dirname, './app/theme/ant-vars.less'), 'utf8')
);

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const sourcePath = path.join(__dirname, './app');
const antdPath = path.join(__dirname, './node_modules/antd');
const buildDirectory = path.join(__dirname, './build');

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const serviceWorkerBuild = env && env.sw;

  const htmlTemplate = isProd ? 'index.prod.ejs' : 'index.dev.ejs';

  let cssLoader;
  let lessLoader;

  const plugins = [
    // create index.html
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true,
      production: isProd,
      preload: ['*.css'],
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ];

  if (isProd) {
    plugins.push(
      // create css bundle
      new ExtractTextPlugin('style-[hash:8].css')
      // minify remove some of the dead code
    );

    cssLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'cache-loader',
        {
          loader: 'thread-loader',
          options: {
            workerParallelJobs: 20,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'collapsed',
            sourceMap: true,
            includePaths: [sourcePath],
          },
        },
      ],
    });

    lessLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'cache-loader',
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'less-loader',
          options: {
            modifyVars: antThemeVars,
            javascriptEnabled: true,
          },
        },
      ],
    });
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin()
    );

    cssLoader = [
      'cache-loader',
      {
        // build css/sass in threads (faster)
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 20,
        },
      },
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]',
        },
      },
      // {
      //   loader: 'typings-for-css-modules-loader',
      //   options: {
      //     modules: true,
      //     namedExport: true,
      //     sass: true,
      //   },
      // },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: false,
          includePaths: [sourcePath],
        },
      },
    ];

    lessLoader = [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          localIdentName: '[name]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'less-loader',
        options: {
          modifyVars: antThemeVars,
          javascriptEnabled: true,
        },
      },
    ];
  }

  if (serviceWorkerBuild) {
    plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'react-jwt-app',
        filename: 'sw.js',
        maximumFileSizeToCacheInBytes: 800000,
        mergeStaticsConfig: true,
        minify: true,
        runtimeCaching: [
          {
            handler: 'cacheFirst',
            urlPattern: /(.*?)/,
          },
        ],
      })
    );
  }

  const entryPoint = isProd
    ? ['whatwg-fetch', './index.tsx']
    : [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${host}:${port}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        // fetch polyfill
        'whatwg-fetch',

        // the entry point of our app
        './index.tsx',
      ];

  return {
    devtool: isProd ? 'cheap-source-map' : 'eval-cheap-module-source-map',
    mode: nodeEnv,
    optimization: {
      namedModules: true,
    },
    context: sourcePath,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      // Computing hashes is expensive and we don't need them in development
      filename: isProd ? '[name]-[hash:8].js' : '[name].js',
      chunkFilename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          include: sourcePath,
          use: {
            loader: 'file-loader',
            options: {
              name: isProd ? 'static/[name]-[hash:8].[ext]' : 'static/[name].[ext]',
            },
          },
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.scss$/,
          include: sourcePath,
          use: cssLoader,
        },
        {
          test: /\.(less)$/,
          include: antdPath,
          use: lessLoader,
        },
        {
          test: /\.ts|tsx?$/,
          include: sourcePath,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // transpileOnly: false,
                getCustomTransformers: () => ({
                  before: [
                    tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true,
                    }),
                  ],
                }),
              },
            },
          ],
        },
        {
          test: /\.js$/,
          include: sourcePath,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ],
    },
    resolve: {
      extensions: [
        '.webpack-loader.js',
        '.web-loader.js',
        '.loader.js',
        '.js',
        '.tsx',
        '.ts',
        '.scss',
      ],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
      symlinks: false,
      alias: {
        app: path.resolve(__dirname, 'app/'),
      },
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 2000000,
      maxEntrypointSize: 2000000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: './app',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
    },
  };
};
