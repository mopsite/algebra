# Algebra

A small, fast, easy-to-use library for primary mathematics.

## Quick Start

```js
var a = new Figure(9)
var result = a.add(3) // 12
result = result.mul(2) // 24
```

```js
var a = new Figure(0.1)
var b = new Figure(0.2)
var result = a.add(b) // 0.3
```

## Install

```sh
npm install @mopsite/algebra
```

## Useage

```js
import algebra from 'algebra'

const { Figure } = algebra
const a = new Figure(0.1)
const b = new Figure(0.2)

console.log(a.add(b).value) // 0.3
```
