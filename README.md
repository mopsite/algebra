# Algebra

algebra 是一个小巧、快速的 JavaScript 库，它用于初级的数学运算。

## 安装

该库是单个 algebra.js 文件，或 ES 模块的 algebra.mjs 文件。

### Node.js

```sh
npm install @mopsite/algebra
```

- Common JS：

  ```js
  const { Figure } = require('@mopsite/algebra')
  ```

- ES Module：

  ```js
  import { Figure } from '@mopsite/algebra'
  ```

### 浏览器

- 将 algebra 添加到全局作用域：

  ```html
  <script src="path/to/algebra.js"></script>
  <script>
    const { Figure } = algebra
  </script>
  ```

- ES 模块：

  ```html
  <script type="module">
    import { Figure } from './path/to/big.mjs'
  </script>
  ```

- CDN 引入：

  ```html
  <script src="https://unpkg.com/@mopsite/algebra"></script>
  <script>
    const { Figure } = algebra
  </script>
  ```

## 使用

### Figure

Figure 是用于创建整数或小数的构造函数。该构造函数接受一个参数，参数可以是数值、字符串、布尔值、数组或者对象。

- 数值

  直接返回以该数值为 value 值的 Figure 对象，数值可以为整数或小数。

  ```js
  const a = new Figure(5)
  console.log(a.value) // 5

  const b = new Figure(3.2)
  console.log(b.value) // 3.2
  ```

- 字符串

  传入的字符串，会先尝试转换为数值，如果转换结果为 NaN，将返回以 0 为 value 值的 Figure 对象。

  ```js
  const a = new Figure('8')
  console.log(a.value) // 8

  const b = new Figure('abc')
  console.log(b.value) // 0
  ```

- 布尔值

  传入的布尔值将对应转成 0 或 1 为 value 值的 Figure 对象。

  ```js
  const a = new Figure(true)
  console.log(a.value) // 1

  const b = new Figure(false)
  console.log(b.value) // 0
  ```

- 数组

  传入的数组，会先调用原生 Number 方法转换，如果转换结果为 NaN 会返回以数组长度为 value 的 Figure 对象。

  ```js
  const a = new Figure([8])
  console.log(a.value) // 8

  const b = new Figure(['a', 'b', 'c'])
  console.log(b.value) // 3
  ```

- 对象

  如果传入的对象是一个 Figure 实例对象，将返回另一个新的 Figure 对象，该新对象的 value 值，为传入对象的 value 值。如果传入其他对象，将返回以 0 为 value 值的 Figure 对象。

  ```js
  const a = new Figure([4])
  const b = new Figure(a)
  console.log(b.value) // 4

  const c = new Figure({ message: 'hello' })
  console.log(c.value) // 0
  ```

- 其他

  如果传入除上述值之外的其他值，或不传参，都会返回以 0 为 value 值的 Figure 对象。

  ```js
  const a = new Figure(new Set())
  console.log(a.value) // 0

  const b = new Figure()
  console.log(b.value) // 0
  ```

#### 类方法

- random()

  `Figure.random` 方法返回一个 Figure 对象，该对象的 value 值为一个随机数。

  该方法默认返回一个 0-10 的整数。

  ```js
  const a = Figure.random()
  console.log(a.value) // 6
  ```

  该方法接收三个数值参数，且必须为整数。第一、二个参数为返回的数值范围，起始值和终止值可以随意填写，不分前后。

  ```js
  const a = Figure.random(2, 8)
  // 返回 2-8 的随机数值
  console.log(a.value) // 5

  const b = Figure.random(7, 1)
  // 返回 1-7 的随机数值
  console.log(a.value) // 7
  ```

  第三个参数用于指定小数部分的位数，默认为 0（即返回整数）。

  ```js
  const a = Figure.random(1, 9, 2)
  console.log(a.value) // 5.47
  ```

#### 对象属性

- value

  Figure 实例对象的 value 属性用于返回该对象对应的 number 数值。

  ```js
  const a = new Figure(6)
  console.log(a.value) // 6
  ```

#### 对象方法

- valueOf()

  Figure 对象的 `valueOf` 方法返回该对象的 value 属性值。当该对象使用原生 Number 函数转换为数值时，显示该 value 值。

  ```js
  const a = new Figure(3)
  console.log(a.valueOf()) // 3
  console.log(Number(a)) // 3
  ```

- toString()

  Figure 对象的 `toString` 方法，会将该对象的 value 属性值先转为字符串，然后返回。当该对象使用原生 String 函数转换为字符串时，显示该字符串。

  ```js
  const a = new Figure(6)
  console.log(a.toString()) // "6"
  console.log(String(a)) // "6"
  ```

- abs()

  Figure 对象的 `abs` 方法，将返回一个新的 Figure 对象。新对象的 value 值是原对象 value 值的绝对值。

  ```js
  const a = new Figure(5)
  console.log(a.abs().value) // 5

  const b = new Figure(-5)
  console.log(b.abs().value) // 5
  ```

- neg()

  Figure 对象的 `neg` 方法，将返回一个新的 Figure 对象。新对象的 value 值是原对象 value 值的相反数。

  ```js
  const a = new Figure(5)
  console.log(a.neg().value) // -5

  const b = new Figure(-5)
  console.log(b.neg().value) // 5
  ```

- mod(arg)

  Figure 对象的 `mod(arg)` 方法，接收一个 arg 参数，该方法会先将参数转为一个 Figure 对象，然后返回一个新的 Figure 对象。新对象的 value 值，是原对象对参数对象求余的值。

  ```js
  const a = new Figure(5)
  const b = new Figure(2)
  console.log(a.mod(b).value) // 1
  ```

- pow(n)

  Figure 对象的 `pow(n)` 方法，接收一个数值参数 n，并返回一个新的 Figure 对象。新对象的 value 值是原对象 value 值的 n 次方。

  ```js
  const a = new Figure(-1.6)
  console.log(a.pow(2).value) // 2.56
  ```

- toFixed(n)

  Figure 对象的 `toFixed(n)` 方法，接受一个数值参数 n，n 必须是 0 到 100 的整数。该方法返回一个新的 Figure 对象，新对象的 value 值是原对象的 value 值保留 n 位小数。

  ```js
  const a = new Figure(1)
  // 1 除以 3 的结果保留 2 位小数
  console.log(a.div(3).toFixed(2).value) // 0.33
  ```

- eq(arg)

  Figure 对象的 `eq(arg)` 方法接受一个 arg 参数，该方法会先将参数转为另一个 Figure 对象，然后判断两个 Figure 对象的 value 值是否相等，并返回一个布尔值。

  ```js
  const a = new Figure(3)
  console.log(a.eq(3)) // true
  console.log(a.eq(5)) // false
  ```

- gt(arg)

  Figure 对象的 `gt(arg)` 方法与 `eq` 方法类似，用于判断原 Figure 对象的 value 值是否大于参数对象的 value 值。

  ```js
  const a = new Figure(6)
  console.log(a.gt(3)) // true
  console.log(a.gt(8)) // false
  ```

- gte(arg)

  Figure 对象的 `gte(arg)` 方法与 `eq` 方法类似，用于判断原 Figure 对象的 value 值是否大于等于参数对象的 value 值。

  ```js
  const a = new Figure(6)
  console.log(a.gte(6)) // true
  console.log(a.gte(8)) // false
  ```

- lt(arg)

  Figure 对象的 `lt(arg)` 方法与 `eq` 方法类似，用于判断原 Figure 对象的 value 值是否小于参数对象的 value 值。

  ```js
  const a = new Figure(6)
  console.log(a.lt(3)) // false
  console.log(a.lt(8)) // true
  ```

- lte(arg)

  Figure 对象的 `lte(arg)` 方法与 `eq` 方法类似，用于判断原 Figure 对象的 value 值是否小于等于参数对象的 value 值。

  ```js
  const a = new Figure(6)
  console.log(a.lte(6)) // true
  console.log(a.lte(8)) // true
  ```

- add(arg)、sub(arg)、mul(arg)、div(arg)

  分别为加减乘除方法，接受一个 arg 值。先将 arg 值转为另一个 Figure 对象，然后返回一个新 Figure 对象。新对象的 value 值是原对象与参数对象 value 值进行加减乘除后的值。

  ```js
  const a = new Figure(6)
  console.log(a.add(4).value) // 10
  console.log(a.sub(8).value) // -2
  console.log(a.mul(3).value) // 18
  console.log(a.div(12).value) // 0.5
  ```

上述方法中，所有返回新 Figure 对象的方法，都可以采用链式调用。

```js
const a = new Figure(6)
console.log(a.add(4).sub(1).mul(2).div(3).value) // 6
console.log(a.div(18).toFixed(2).value) // 0.33
```
