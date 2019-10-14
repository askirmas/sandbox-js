function chain(value) {
  return fn => pipe(fn(value))
}

const traps = v => ({
  get(_t, p, r) {
    return p === Symbol.toPrimitive
    ? _hint => v
    : Reflect.get(v, p, r)
  },
  getPrototypeOf(_t) {
    return Object.getPrototypeOf(v)
  }
})

function pipe (x) {
  const c = chain(x);
  return new Proxy(c, traps(x))
}
const x = pipe(2)(x => x + 1)(y => y+1) 
console.log([
  pipe({a: 2}).a, check(2), Object.getPrototypeOf(x) === Number.prototype, x == 4 
])

function check(v) {
  const p = pipe(v)
  return {
    value: p == v,
    valueStrict: p === v
  }
}