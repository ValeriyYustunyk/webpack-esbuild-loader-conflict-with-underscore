const path = require("path");
const { EsbuildPlugin } = require('esbuild-loader')

module.exports = {
    entry: "./src/index.js", // Change this to your main file
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        cacheWithContext: true,
        symlinks: false
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx", // Or "ts" if you're using TypeScript
                    target: "esnext",
                },
                exclude: /node_modules/,
            }
        ],
    },
    optimization: {
        moduleIds: 'named',
        splitChunks: {
            cacheGroups: {
                defaultVendors: false
            }
        },
        minimize: true,
        minimizer: [
            new EsbuildPlugin({
                target: "esnext"
            }),
        ],
    },
    resolveLoader: {
        modules: [
            'public/',
            path.join(__dirname, './loaders'),
            path.resolve('node_modules')
        ]
    }
};
