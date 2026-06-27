import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { watchFile } from "node:fs";
import test from "node:test";

export default {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: { watchFiles: ["./src/template.html"], },
    plugins: [ 
        new HtmlWebpackPlugin({template: "./src/template.html"}),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ],
    },
};