var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BUILD = process.env.BUILD;


function resoveNodeModulePath(componentPath) {
  return path.join(__dirname, 'node_modules', componentPath);
}

/**
 * Resolves npm dependencies to their correct paths
 * @param  {Object} dest   object to append to
 * @param  {Array} source list of npm dependencies
 * @return {void}        nothing, modifies dest
 */
function resolveNpmDependencies(dest, source) {
  source.forEach(function (k) {
    dest[k] = require.resolve(k);
  });
}
module.exports = {
  // cache for faster builds
  cache: true,

  entry: {
    app: ["webpack/hot/dev-server", './js/index.js']
  },
  output: {
    path: "./dist",
    publicPath: "/",
    filename: "bundle.js"
  },

  // create source maps
  devtool: 'source-map',

  module: {
    loaders: [
        {
          test: path.join(__dirname, 'es6'),
          loader: 'babel-loader'
        },
        {
          test: /\.css$/, 
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
        }
    ]
  },

  // look for these files
  resolve: {
    modulesDirectories: ["bower_components", "node_modules"],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],

    // aliases for modules
    alias: resolveNpmDependencies({}, [
    ])
  },

  externals: {
    // '$': 'jQuery',
    // 'jQuery': 'jQuery'
  },

  plugins: [
    // check the main field in bower.json of loaded package for the proper
    // file to load
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ]),
    new ExtractTextPlugin("css/styles.css")
    // Export globals into all files
    //new webpack.ProvidePlugin({
    //}),
  ]

};

if(BUILD) {
  module.exports.entry = {
    app: ['./js/index.js']
  };
  module.exports.devtool = null;
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));


  var exec = require('child_process').exec, child;

  child = exec('mkdir -p ./dist; cp -r ./assets/** ./dist',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
