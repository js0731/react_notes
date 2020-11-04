
### react hooks 基本介紹
Hook是 React 16.8 中增加的新功能，不必寫 class 就能使用 state 以及其他 React 的功能。

### react hooks 解決了甚麼問題 ?

1.  **函數組件不能用 state**

	* 在 react hooks 推出之前，函式元件通常只能用於簡單、無交互的場景，比如畫面顯示，當需要交互時就得用臃腫的 class 組件來達成。
	
	* 在 react hooks 推出之後，函式元件能使用state功能，可以涵蓋所有 class 能處理的情景，並且比class更加簡潔，這同時提升了開發效率與程式碼的品質。
	

2.  **副作用的問題**

	* 通常獲取資料、操作 React Dom 這些行為可以稱為副作用(side effect)，而 react hooks 提供了 `useEffect` 這個 API 來處理元件的副作用問題，意味者可以在函式元件內進行這類操作，而 class 元件卻需要依賴 `componentDidMount` `componentDidUpdate` `componentWillUnmount` 這幾個生命週期來實現，`useEffect` 可以說是這幾個生命週期方法的統一。

---
* 基礎的 Hook
	* useState
	* useEffect
	* useContext
* 額外的 Hook
	* useReducer
	* useCallback
	* useMemo
	* useRef
	* useImperativeHandle
	* useLayoutEffect
	* useDebugValue


## useState能使函式元件使用 state 。

### 基本結構

`const [state, setState] = useState( initState )`

* state : 要設置的狀態
* setState : 更新state的方法，命名隨意
* initState : 起始的state，可以是任何資料類型，也可以是回調函數，但必須有返回值。
 
### 具體例子
```
import  React, { useState } from  'react';

const  App = () => {

	const [count, setCount] = useState(0)
	
		return (
			<div>
				<p>你點擊了{count}下</p>
				<button  onClick={() =>  setCount(count + 1)}>
					點擊
				</button>
			</div>
		);
	}
export  default  App;
```

## useRffect 副作用

### 基本結構

`useEffect(callback, array)`

1. callback: 回調函數，用於處理副作用邏輯。
2. array(可選): 一個陣列，用於控制執行。

### 具體例子

```
import  React, { useState, useEffect } from  'react';

const  App = () => {
	const [count, setCount] = useState(0)
	
	useEffect(() => {
		// 更新頁面的標題
		document.title = `你點了${count}次`
	}, [])
	
	return (
		<div>
			<p>你點擊了{count}下</p>
			<button  onClick={() =>  setCount(count + 1)}>
				點擊
			</button>
		</div>
	);
}

export  default  App;
```
### 參數

* callback : 回調函數是 `useEffect` 的第一個參數，另外可以在 callback 中返回一個函數用於在元件卸載前做的一些事情，類似於 `componentWillUmMount`。
	```
	useEffect( () => {
		//副作用邏輯
		reuturn () => {
			// 	在元件卸載前做的一些事情。
		}
	})
	```

* array :  可用於控制 `useEffect` 是否執行，分為以下三種情況。
 
	1. 如果是空陣列，則會執行一次(render之後)，相當于 `componentDidMount`。
		```
		useEffect( () => {
			// 該effect會在初次渲染之後執行一次。
		},[])
		```
		
	2.  如果陣列中存在值，那麼 `useEffect` 會在**陣列發生改變**後執行相當于 `componentDidUpdate`。
	
		```
		useEffect( () => {
			// 該effect會在初次渲染之後執行一次，同時陣列發生改變時也會執行。
		},[value])
		```
		
	3. 如果不填入參數的話，`useEffect` 會在每次渲染後執行。
	
		```
		useEffect( () => {
			// 該effect會在每次渲染後執行。
		},)
		```

### 執行多個 `useEffect`
```
import  React, { useState, useEffect } from  'react';

const  App = () => {
const [count, setCount] = useState(0)

useEffect(() => {
	// 更新頁面的標題
	document.title = `你點了${count}次`
}, [count]) // count 值改變標題也更著改變，但如果這個參數裡面的值沒有任何改變(也就是count以外的值)，那這個函式將不會執行。

useEffect(() => {
	// 把第二個參數拿掉，這樣每次更新 count 值都會執行。
	console.log(count);
})

return (
	<div>
		<p>
			你點擊了{count}下
		</p>
		<button  onClick={() =>  setCount(count + 1)}>
			點擊
		</button>
	</div>
	);
}
  
export  default  App;
```

## context 

### 介紹

在專案越來越龐大時，通常我們使用 redux 作為全域的狀態管理器，而 context 是 react 提供用來解決需要通過多層 props 的問題。

### context  主要通過以下三步 :

1. 通過 React.createContext( ) 創建 Context 。
2.  使用 Context.Provider 包裹元件，給他的後代元件提供數據。 
3. Context.Provider 所有的後代元件，都可以通過一個 Context.Consumer 獲取 Context 資料

### 使用案例

1. 創建 Context

	 `const Context = React.createContext();`
	 
2. 使用 Context.Provider 包裹元件

	```
	<Context.Provider value = { data }>
		<MyComponent />
	</Context.Provider>
	```
3. 使用 Context.Consumer 獲取共享的資料

	```
	<Context.Consumer>
		{ value => {
			// value 就是通過 context 共享的資料，這裡是 data
		}}
	</Context.Consumer>
	```
	
## useContext(context)

### 介紹

 `userContext(context)` 是針對  `context` 提出的 API，他接受 `React.createContext( )`的返回值作為參數，也就是 context 對象，並返回最近的 context ; 使用 userContext( ) 將不在需要 Provider 和 Consumer ; 當最近的 context 更新時，那麼使用該 context 的 hook 將會重新渲染。

### 基本使用
```
const Context = React.createContext({
	loading : false,
	name : "Hellow",
});

// 元件1
const OnePage = () => {
	const ctx = useContext(Context);
	return (
		<div>
			{ ctx.loading && "Loading..." }
		</div>
	)
}

```

### 元件間傳遞資料

App 元件

```
import  React  from  'react';
import  App2  from  './App2.js';

const  data = React.createContext({
	name:  '哈囉囉囉'
})

const  App = () => {
	return (
		<div>
			<App2  propData={data}  />
		</div>
	)
}

export  default  App;
```

App2 元件

```
import  React, { useContext } from  'react';

const  App2 = ({ propData }) => {

	const  data = useContext(propData);
	console.log('App2 - ', data);

	return (
		<div>
			{data.name}
		</div>
	)
}

export  default  App2;
```

### 直接引入元件資料


App 元件

```
import  React  from  'react';
import  App2  from  './App2.js';

export  const  propData = React.createContext({
	name:  '哈囉囉囉'
})

const  App = () => {
	return (
		<div>
			<App2 />
		</div>
	)
}

export  default  App;
```

App2 元件

```
import  React, { useContext } from  'react';
import { propData } from  './App.js';

const  App2 = () => {

	const  data = useContext(propData);
	console.log('App2 - ', data);

	return (
		<div>
			{data.name}
		</div>
	)
}

export  default  App2;
```

###  最好的方式

將資料放在 src / 資料夾下 ， 提供全局引入使用

## userReducer - 複雜的狀態管理

### 基本用法

`const [state, dispatch] = useReducer(reducer, initialState, initialAction)`;

* state : 為狀態 。
* dispatch: 為更新 state 的方法，接受 action 作為參數。
* reducer : 是一個函式，用於處理 action 並更新 state。
* initialState : 為初始的 state 。
* initState : 為 useReducer 初次執行時被處理的 action。

### 如何用 useReducer 更新 state ?

`dispatch( { type : "reset"} )`

dispatch 用于更新state，當 dispatch(action) 被調用時，reducer 方法也會被調用，並會根據 action 的描述去更新 state 。

### reducer 參數詳解

在了解 reducer 前，先來了解 action 是什麼。

*  action 
	*	 是一種動作的描述，描述你發出這個動作他應該做的事 ;  action本質是一個物件(Object)，通常有一個 `type` 屬性，用於描述如何更新 state，此外還可以攜帶其他參數。

			```
			const action = {
				type: 'increment',  // 增量，表示該 state 的值要增加
				payload : {
					other : 'value'  // 攜帶的其他參數	
				} 
			}
			```

			該如何把描述性的 action 轉換為最新的 state ? 這就是 reducer 函數該做的事了。

* reducer 
	* 本質上是一個函數，主要用於處理 action，並返回最新的 state ; 整體來說 reducer 是 action 和  state 的轉換器，他根據 action 的描述，去更新 state 。

	* 基礎結構
		 `(state, action) => newState`
	
	* 應用案例
		```
		import  React, { useReducer } from  'react';

		const initialState = { count : 0 }; // 初始 state
		
		const reducer = (state, action) => {
		
			// 變數 action 根據 action 的描述去更新 state
			switch( action.type ) {
			
				// 當 type 為 reset 時，重置state的值，讓 state 等於初始 state
				case 'reset':
					return initialState;
				
				// 當 type 為 increment時，讓 count + 1
				case 'increment':
					return { count : state.count + 1 };
				
				// 當 type 為 decrement 時，讓 count - 1
				case 'decrement ':
					return { count : state.count - 1  };
				
				// 當 type 不屬於上面任何一個值時，不做任何更改，返回當前的 state
				default :
					return state ;

			}
		}

		const App = () => {
			const [state, dispatch]	= useReducer(reducer, initialState);
			return(
				<div>
					<p> 當前 count 值為 { state.count } </p>
					<p> <button onClick = { () => dispatch({ type : 'reset'}) }> 重置 </button> </p>
					<p> <button onClick = { () => dispatch({ type : 'increment'}) }> 加 1 </button> </p>
					<p> <button onClick = { () => dispatch({ type : 'decrement '}) }> 減 1 </button> </p>
				</div>	
			)
		} 
	
		export  default  App
		```

###  結合 useContext 使用

useContext 可以解決組件間的資料共享問題，而 useReducer 則解決了複雜狀態管理的問題，因此把他們結合起來之後，那也意味者不用再依賴第三方的狀態管理器了。

##  額外的 Hooks

* useMemo
* useCallback
* useRef
* useImperativeMethods
* useLayoutEffect

## useMemo

### 介紹

是一個用於性能優化的 API，他的目的是用來 **「避免重複進行複雜耗時的計算」**，在開發中遇到比較複雜的計算，或複雜的業務邏輯時就可以用 `useMemo` 做一些優化但如果只是簡單的計算的話，`useMemo` 可能花費的效能還比較高，反而沒有加速到。

### 基本用法

  `const memoizedValue = useMemo(callback, array);`
  
1. callback : 一個函數，用於處理計算邏輯。
2. array : 一個陣列，當數組發生改變時 useMemo 才會重新執行。

useMemo 的返回值就是記憶值，它是 callback 的返回值 ; useMemo 只會在陣列發生變化時才會重新計算記憶值，這樣有助於避免再渲染上進行昂貴的計算。

### 具體例子

```

// useMemo 只會在 obj1 obj2 發生改變時才會執行
const obj1 = { id : "12", name : "jack" };
const obj2 = { id : "14", name : "ben", age : 21 };

只會在 obj1, obj2 發生改變時，才回重新記憶這個 memoizedValue，這樣有助於避免在渲染上進行昂貴的計算。
const  memoizedValue = useMemo( () =>  Object.assign(obj1, obj2), [obj1, obj2] )
console.log(memoizedValue )

// 使用
<div> { memoizedValue.name } </div>
```  	

note : 不要在 useMemo 裡面處理副作用，副作用應該放在  useEffect 裡面


## useCallback

### 介紹

useCallback 跟 useMemo  類似，都是用於優化的 API，他們的返回值都是記憶化的，但有一些不同，useMemo 的返回值就是 callback 的返回值，而 useCallback 的返回值則是 callback 函式本身。

### 基本用法

  `const memoizedCallback = useCallback (callback, array);`

1. callback : 一個函數，用於處理計算邏輯。
2. array : 一個陣列，當數組發生改變時 useCallback 才會重新執行。

### 具體例子

```
const obj1 = { id : "12", name : "jack" };
const obj2 = { id : "14", name : "ben", age : 21 };

const  memoizedFn = useCallback( () =>  Object.assign(obj1, obj2), [obj1, obj2] )
console.log(memoizedFn)

// 使用
<div> { memoizedFn().name } </div>
```

## useRef

### 介紹

useRef 是一個可以抓取到 DOM 節點的 hooks。
```
import React, { useRef } from  'react'
		
const App = () => {
	// 1. 創建 ref
	const inputElement = useRef();
	const onInput = () => {
		// 3. 訪問 ref
		console.log( inputElement.current.value );	
	}
	// 2. 掛載 ref
	return (
		<div>
			<input ref = { inputElement } type="text" />
			<p>
				<button onClick = { onInput } > 獲取 input 值 </button>
			</p>
			
		</div>	
	)
}
```

## useImperativeMethods (不常用)


### 使用案例

```
function FancyInput(props, ref) {
	const inputRef = useRef();
	useImperativeMethods(ref, () => {
		focus : () => {
			inputRef.current.focus();
		}  
	})
}
```

## useLayoutEffect(不常用)

### 介紹

useLayoutEffect 與 useEffect 基本相同，但它做所有 DOM 變化時同步觸發，它能從DOM
讀取布局並同步重新渲染。在瀏覽器有機會繪製前，將在 useLayoutEffect 內部計劃的更新同步刷新。

在多數情況下，首選 useEffect，以免阻止視覺更新(就是在短時間內阻止頁面的渲染)。

### 使用案例

```
useLayoutEffect( () => {
	const rootElement = document.getElementById("root");
	console.log(rootElement);
},[])
```

## 透经常使用的四種 hooks

-   useState
-   useEffect
-   useCallback
-   useRef

## 自定義 hooks

自定義 hooks 是一個 JS 函數， 其名以 	`use` 開頭，函數內可以調用其他 hooks，只要就是利用 react hooks 封裝成一個具又特定邏輯或可重用的函數。
```
import  React,{ useEffect } from  'react';

const  useDocumentTtitle =(title)=>{
	useEffect(()=>{
	document.title = title;
	},[ title ])
}

const App = () => {
	useDocumentTtitle("我是标题");
		return (
			<div>
				测试组件
			</div>
		)
	}
	
export  default App
```

## hooks 的規則

### 只在頂層調用 hooks

不要再迴圈、條件、或嵌套函數使用 hooks，否則可能會無法確保每次元件渲染時都以相同的順序調用 hook。

```
import  React,{ useState } from  'react';

const App = () => {

	// 這裡是函數內的頂層做越域
	const [count,setCount] = useStste(0); // 建議在頂層使用
	
	if(props.name){
		const [count,setCount] = useStste(0); // 不會報錯，不建議在裡面使用(可能會破壞 hook 的調用順序)
	}
	
	return(
		<div>
			測試組件
		</div>	
	)
}
```

嵌套函數 : 就是指在某些情況下，您可能需要將某函數作為另一函數的參數使用，這一函數就是嵌套函數。
 

### 只在函數元件調用 hooks

react hooks 目前只支持函數元件，因此不能在 class 元件調用它的 API ，但你可以在 class 內調用 react hooks 元件

未來 react 官方計畫將 react hooks 拓展到 class 元件，到時候 class 可能也能使用 react hooks。 