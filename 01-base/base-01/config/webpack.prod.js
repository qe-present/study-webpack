const path = require('path'); //引入path模块
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    //入口
    entry: './src/main.js', //相对路径
    //输出
    output: {
        //path:输出路径 绝对路径 __dirname:当前文件所在目录 + dist:dist目录
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, '../../../01-build'),

        //filename:输出文件名
        filename: 'static/js/main.js',
        clean: true //每次打包前清空dist目录 在打包时会自动清空path目录
    },
    //加载器
    module: {
        rules: [
            // loader配置
            {
                test: /\.css$/, // \.转义.  $以.css结尾
                use: [// 从右到左解析,从下到上执行
                    MiniCssExtractPlugin.loader, //提取css文件到单独的文件中
                    'css-loader' //css-loader: 将css文件转换为commonjs的模块到js中
                ],

            },
            {
                test: /\.less$/,
                use: [
                    // loader 只能使用1个loader
                    // use 可以使用多个loader
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 图片大小小于100kb才会被转为base64
                        maxSize: 100 * 1024 // 100kb
                    }
                },
                generator: {
                    // 图片文件名格式 [hash:8] 8位hash值 [ext] 文件扩展名 [query] 查询参数
                    filename: 'static/images/[hash:8][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    // 字体文件名格式 [hash:8] 8位hash值 [ext] 文件扩展名 [query] 查询参数
                    filename: 'static/media/[hash:8][ext][query]'
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                type: 'asset/resource',
                generator: {
                    // 音频文件名格式 [hash:8] 8位hash值 [ext] 文件扩展名 [query] 查询参数
                    filename: 'static/media/[hash:8][ext][query]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules目录
                loader: 'babel-loader'
            },

        ]
    },
    //插件
    plugins: [
        new ESLintPlugin({
            // 检查src目录下所有文件
            context: path.resolve(__dirname, '../src'),
        }),
        new HtmlWebpackPlugin(
            {
                // 新的html文件名 会自动放到output.path目录下 默认是index.html并且自动引入打包的js文件
                template: path.resolve(__dirname, '../public/index.html'),
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: 'static/css/[name].css'
            }
        )

    ],
    //模式
    mode: 'production' // development:开发模式    production:生产模式
}
// 生产模式
