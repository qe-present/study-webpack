const path = require('path'); //引入path模块
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
    //入口
    entry: './src/main.js', //相对路径
    //输出
    output: {
        //path:输出路径 绝对路径 __dirname:当前文件所在目录 + dist:dist目录
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, '../dist'),

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
                    'style-loader', // style-loader:将js模块中的样式插入到html中
                    'css-loader' //css-loader: 将css文件转换为commonjs的模块到js中
                ],

            },
            {
                test: /\.less$/,
                use: [
                    // loader 只能使用1个loader
                    // use 可以使用多个loader
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
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
            context: path.resolve(__dirname, 'src'),
        })
    ],
    //模式
    mode: 'development' // development:开发模式    production:生产模式
}
