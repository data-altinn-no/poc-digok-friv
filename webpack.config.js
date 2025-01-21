const path = require('path');
const Dotenv = require('dotenv-webpack'); // Import dotenv-webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    plugins: [
        new Dotenv(), // Add dotenv-webpack here
        new HtmlWebpackPlugin({
            template: './public/index.html', // Ensure this matches your HTML file
        }),
    ],
};
