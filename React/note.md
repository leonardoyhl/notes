## 核心
* 思想：封装组件
各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件。
* 四大概念
  * 组件
  * JSX
  * Virtual DOM
  * Data Flow

### props 父传子


### state 私有状态

### 状态提升
当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 `state` 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。

### 不可变性
1. 不可变性使得复杂的特性更容易实现
    如“时间旅行”可以使我们回顾井字棋的历史步骤，并且可以“跳回”之前的步骤；实现撤销和恢复功能。
2. 跟踪数据的改变
    如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。
    跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。
3. 确定在 `React` 中何时重新渲染
    帮助我们在 `React` 中创建 `pure components`。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

### 函数式组件
只包含`render`函数，并且不包含`state`
不需要继承`React.Component`类，函数接受`props`
```javascript
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}> // 两侧没有括号
        {props.value}
        </button>
    );
}
```

### `for`在`JSX`中应该被写作 `htmlFor`
```html
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### `A11y` Accessibility
JSX 支持所有 `aria-*` HTML 属性

### 无障碍表单
* 焦点控制
React DOM Refs

```javascript
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        // 创造一个 textInput DOM 元素的 ref
        this.textInput = React.createRef();
    }
    render() {
    // 使用 `ref` 回调函数以在实例的一个变量中存储文本输入 DOM 元素
    //（比如，this.textInput）。
    return (
        <input
        type="text"
        ref={this.textInput}
        />
    );
    }
}
```
```javascript
focus() {
    // 使用原始的 DOM API 显式地聚焦在 text input 上
    // 注意：我们通过访问 “current” 来获得 DOM 节点
    this.textInput.current.focus();
}
```

### React.lazy

### Suspense


### useState, useEffect, useCallback
