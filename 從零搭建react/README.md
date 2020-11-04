
### 初始化

`npm init -y`

### 安裝webpack套件

`npm i webpack --save-dev`
`npm i webpack-cli --save-dev`(比較新的版本需要安裝)

```
{
	"name": "react",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		"build" : "webpack"
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```
###  /src/進入點 => webpack => /dist/ 打包成可執行檔案
project / `mkdir src`
project / src / `touch index.js`

```
路徑 : project / src / index.js 

console.log('webpack test');
```

`npm run build` 測試(這時候會自動生成 dist資料夾和main.js檔)

project / dist / `touch index.html`
```
路徑 : project / dist / index.html

<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8"  />
			<meta name="viewport" content="width=device-width, initial-scale=1.0"  />
		</head>
	<body>
		<div id="root">test</div>
		<script src='main.js'></script>
	</body>
</html>
```

### webpack搭配react(不包含jsx)

`npm i react  --save`
`npm i react-dom --save`

```
路徑 : project / src / index.js 

import React from "react"
import ReactDOM from "react-dom"

let  elem = React.createElement("h1", {}, "Hello React");
ReactDOM.render( elem, document.querySelector('#root') );
```

`npm run build` 開啟 index.html 可以按到 Hello React

### 瀏覽器不支援 JSX 語法，所以要用 Babel 編譯，這不是webpack工作 是babel的工作，所以要把babel整合到webpack裡

```
路徑 : project / src / index.js

import  React  from  "react"
import  ReactDOM  from  "react-dom"

const  App = () => {
	return (
		<h1>hello react !!!!!!!!!!!</h1>  // JSX
	)
}

ReactDOM.render(<App  />, document.getElementById("root"));
```
未配置babel使用上述的寫法`npm run build`會出錯

### 開始配置Babel 

`npm i babel-core  --save-dev`  版本8以上的Babel核心套件
`npm i babel-loader --save-dev` 使用webpack打包檔案的時候，可使用loader系列的套件，讓webpack知道，什麼樣子的檔案要用什麼loader來編譯。

`npm i babel-preset-env --save-dev` 翻譯ES6語法的preset
`npm i babel-preset-react --save-dev` 針對JSX處理的套件，webpack在打包的時候依照選擇的`preset`把檔案編譯成`JavaScript`


```
{
	"name": "react",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	"babel":{
		"presets" : ["env", "react"]	
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build" : "webpack"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```



### 設定webpack
project / `touch webpack.config.js`
```
位置: project / webpack.config.js

const  path = require('path');

module.exports = {
	entry:  './src/index.js', //要打包原始碼來源
		output: {
			filename:  'main.js', //輸出打包後的檔案名稱，通常為bundle.js
			path:  path.resolve(__dirname, 'dist')//輸出打包後的資料夾放置位置
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
```
`npm run build`

### 這裡有個坑(未來可能會解決)

#### 預設的版本 babel-loader 8.0以上，會跟babel-core不相容，改成7.1.5

```
{
	"name": "cc",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"babel": {
		"presets": [
			"env",
			"react"
		]
	},
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"babel-core": "^6.26.3",
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		"babel-loader": "^7.1.5",
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		"babel-preset-env": "^1.7.0",
		"babel-preset-react": "^6.24.1",
		"webpack": "^5.2.0",
		"webpack-cli": "^4.1.0"
	},
	"dependencies": {
		"react": "^17.0.1",
		"react-dom": "^17.0.1"
	}
}
```
改完後再重新下載
`npm i babel-loader --save-dev`

