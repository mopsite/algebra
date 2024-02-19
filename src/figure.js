import { type } from './helps.js'

export class Figure {
  constructor(arg) {
    switch (type(arg)) {
      case 'number':
        if (isNaN(arg)) throw TypeError('Need a valid number.')
        this.value = arg
        break
      case 'string':
        this.value = Number(arg)
        if (isNaN(this.value))
          throw TypeError('The string value is not a valid number.')
        break
      case 'array':
        this.value = arg.length
        break
      case 'object':
        if (arg instanceof Figure) {
          this.value = arg.value
        } else if (arg.toFigure) {
          this.value = new Figure(arg.toFigure()).value
        } else {
          throw TypeError(
            'The object must be a instance of Figure, or have a toFigure method which is return a value conform to Figure.'
          )
        }
        break
      default:
        throw TypeError(
          'The Figure constructor needs a argument which is a number/string/array, a instance of Figure, or a object which have a toFigure method.'
        )
    }

    try {
      this.decimals = this.value.toString().split('.')[1].length
    } catch (e) {
      this.decimals = 0
    }

    this.sign = Math.sign(this.value)

    Object.freeze(this)
  }

  abs() {
    return new Figure(Math.abs(this.value))
  }

  neg() {
    return new Figure(-this.value)
  }

  mod(arg) {
    const f = new Figure(arg)
    return new Figure(this.value % f.value)
  }

  pow(arg) {
    const f = new Figure(arg)
    return new Figure(Math.pow(this.value, f.value))
  }

  eq(arg) {
    const f = new Figure(arg)
    return this.value === f.value ? true : false
  }

  gt(arg) {
    const f = new Figure(arg)
    return this.value > f.value ? true : false
  }

  gte(arg) {
    const f = new Figure(arg)
    return this.value >= f.value ? true : false
  }

  lt(arg) {
    const f = new Figure(arg)
    return this.value < f.value ? true : false
  }

  lte(arg) {
    const f = new Figure(arg)
    return this.value <= f.value ? true : false
  }

  add(arg) {
    const f = new Figure(arg)
    const m = Math.pow(10, Math.max(this.decimals, f.decimals))
    const result = (this.value * m + f.value * m) / m
    return new Figure(result)
  }

  sub(arg) {
    return this.add(-new Figure(arg).value)
  }

  mul(arg) {
    const f = new Figure(arg)
    const m = this.decimals + f.decimals
    const s1 = this.value.toString().replace('.', '')
    const s2 = f.value.toString().replace('.', '')
    const result = (Number(s1) * Number(s2)) / Math.pow(10, m)
    return new Figure(result)
  }

  div(arg) {
    const f = new Figure(arg)
    if (f.value === 0) throw TypeError('Divide by zero.')
    const m = f.decimals - this.decimals
    const s1 = this.value.toString().replace('.', '')
    const s2 = f.value.toString().replace('.', '')
    return new Figure(Number(s1) / Number(s2)).mul(Math.pow(10, m))
  }

  toString() {
    return this.value + ''
  }

  toFixed(n) {
    if ((type(n) !== 'number' || isNaN(n)) && (n > 100 || n < 0))
      throw TypeError('The argument must be a number, and between 0 to 100.')
    return new Figure(this.value.toFixed(n))
  }
}
