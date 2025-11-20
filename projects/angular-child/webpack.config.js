const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "angularChild",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angularChild",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './projects/angular-child/src/app/app.module.ts'
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto"
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto"
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto"
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto"
        },
        "rxjs": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto"
        }
      }
    })
  ]
};
