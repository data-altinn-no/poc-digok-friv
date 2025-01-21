const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/',
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
            ...(isDevelopment ? [new Dotenv()] : []),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'public'),
                        to: path.resolve(__dirname, 'build'),
                        globOptions: {
                            ignore: ['**/index.html'],
                        },
                    },
                ],
            }),
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(process.env.API_URL || ''),
                'process.env.SUBSCRIPTION_KEY': JSON.stringify(process.env.SUBSCRIPTION_KEY || ''),
            }),
        ],
    };
};
