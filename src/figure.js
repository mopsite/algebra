import { type, random } from './helps/index.js'

export class Figure {
  #value
  #decimals
  #sign

  constructor(arg) {
    let value = 0
    switch (type(arg)) {
      case 'Number':
        value = isNaN(arg) ? value : arg
        break
      case 'String':
        value = isNaN(Number(arg)) ? arg.length : Number(arg)
        break
      case 'Boolean':
        value = Number(arg)
        break
      case 'Array':
        value = isNaN(Number(arg)) ? arg.length : Number(arg)
        break
      case 'Object':
        value = arg instanceof Figure ? arg.value : value
        break
    }

    try {
      this.#decimals = String(value).split('.')[1].length
    } catch (e) {
      this.#decimals = 0
    }

    this.#value = Number(String(Math.abs(value)).replace('.', ''))

    this.#sign = Math.sign(value) === -0 ? 0 : Math.sign(value)
  }

  get value() {
    return (this.#value * this.#sign) / 10 ** this.#decimals
  }

  set value(arg) {
    const f = new Figure(arg)
    this.#value = f.#value
    this.#decimals = f.#decimals
    this.#sign = f.#sign
  }

  static random(n1 = 0, n2 = 10, decimals = 0) {
    let result
    if (
      Number.isInteger(n1) &&
      Number.isInteger(n2) &&
      Number.isInteger(decimals)
    ) {
      let intPart
      let fraPart = '.'
      decimals = decimals > 0 ? decimals : 0
      intPart = n1 < n2 ? random(n1, n2) : random(n2, n1)
      for (let i = 0; i < decimals - 1; i++) {
        fraPart += random(0, 9)
      }
      fraPart += random(1, 9)
      result = decimals > 0 ? intPart + fraPart : intPart
      return new Figure(result)
    } else {
      throw new TypeError('The arguments must be integer number.')
    }
  }

  add(arg) {
    const f = new Figure(arg)
    const r = Math.abs(this.#decimals - f.#decimals)
    const m = Math.max(this.#decimals, f.#decimals)
    const result =
      this.#decimals > f.#decimals
        ? (this.#value * this.#sign + f.#value * 10 ** r * f.#sign) / 10 ** m
        : (this.#value * 10 ** r * this.#sign + f.#value * f.#sign) / 10 ** m
    return new Figure(result)
  }

  sub(arg) {
    const f = new Figure(arg)
    f.value = -f.value
    return this.add(f)
  }

  mul(arg) {
    const f = new Figure(arg)
    const m = this.#decimals + f.#decimals
    const result = (this.#value * this.#sign * (f.#value * f.#sign)) / 10 ** m
    return new Figure(result)
  }

  div(arg) {
    const f = new Figure(arg)
    if (f.#value === 0) throw new TypeError('Divide by zero.')
    const m = f.#decimals - this.#decimals
    const result = (this.#value * this.#sign) / (f.#value * f.#sign)
    return new Figure(result).mul(10 ** m)
  }

  valueOf() {
    return this.value
  }

  toString() {
    return this.value + ''
  }

  abs() {
    return new Figure(Math.abs(this.value))
  }

  neg() {
    const f = new Figure(this)
    f.#sign *= -1
    return new Figure(f)
  }

  mod(arg) {
    const f = new Figure(arg)
    const r = Math.abs(this.#decimals - f.#decimals)
    const m = Math.max(this.#decimals, f.#decimals)
    const result =
      this.#decimals > f.#decimals
        ? (this.#value * this.#sign) % (f.#value * 10 ** r * f.#sign)
        : (this.#value * 10 ** r * this.#sign) % (f.#value * f.#sign)
    return new Figure(result / 10 ** m)
  }

  pow(n) {
    return new Figure(
      (this.#value * this.#sign) ** n / 10 ** (this.#decimals * n)
    )
  }

  toFixed(n) {
    if (n < 0 || n > 100) throw new RangeError('The argument must be 0 to 100.')
    return new Figure(this.value.toFixed(n))
  }

  eq(arg) {
    return this.value === new Figure(arg).value
  }

  gt(arg) {
    return this.value > new Figure(arg).value ? true : false
  }

  gte(arg) {
    return this.value >= new Figure(arg).value ? true : false
  }

  lt(arg) {
    return this.value < new Figure(arg).value ? true : false
  }

  lte(arg) {
    return this.value <= new Figure(arg).value ? true : false
  }
}
