const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "host",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        angularChild: "angularChild@http://localhost:4205/remoteEntry.js",
        reactChild: "reactChild@http://localhost:4206/remoteEntry.js",
        vueChild: "vueChild@http://localhost:4207/remoteEntry.js"
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false
        },
        "rxjs": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false
        }
      }
    })
  ]
};
