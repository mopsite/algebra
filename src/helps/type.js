export const type = data => Object.prototype.toString.call(data).slice(8, -1)

const types = ['Number', 'String', 'Boolean', 'Array', 'Object']

types.forEach(t => (type['is' + t] = o => type(o) === t))
