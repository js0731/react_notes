const path = require('path');

module.exports = {
    entry: './src/index.js', //要打包原始碼來源
    output: {
        filename: 'main.js', //輸出打包後的檔案名稱，通常為bundle.js
        path: path.resolve(__dirname, 'dist')//輸出打包後的資料夾放置位置
    },// 以上是基本設定
    //在webpack 設定檔中加入 babel-loader 設定，以支援 JSX語法
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 當webpack在包裝 .js、.jsx檔案時
                use: [
                    'babel-loader', // 採用bab-loader做一個編譯，這樣就jsx就可以被babel正確的處理轉換
                ]
            }
        ]
    }
}