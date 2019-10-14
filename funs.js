const g = v => () => v
, undef = () => undefined
, undefL = () => undef
, gs = (...args) => args.map(g)
, sumV = (a, b) => a + b
, sumF = (fa, fb) => () => fa() + fb()
, res = sumF(...gs(1, 2))
/*sumF(res, res)() !== 6)*/

function $lambda(fn, cache = new Map) {
  return  new Proxy(fn, {
    apply(_t, _$this, [arg]) {
      if (cache.has(arg))
        return cache.get(arg)
      if (!fn && fn != undef)
        return undefined
      const v = fn(arg)
      , l = () => v
      cache.set(arg, l)
      return l
    }
  })
}

function mapize(source) {
  return !Object.prototype.isPrototypeOf(source) 
  || Map.prototype.isPrototypeOf(source)
  ? source
  : new Map(Object.entries(source))
}

function reflect(v, fn) {
  fn(v)
  return v 
}

const arrCache = new Map
const add = $lambda(x => (console.log('sideEffect'), x() + 1))
, $primitive = (primitives = new Map, $lambda(x => x, primitives))
, $array = ([x, ...args]) => $term(x)
, $term = x => Array.isArray(x) ? $array(x) : $primitive(x)
, a = $term(1)
console.log(
  $term(1) === a && add(a) === add(a) && add(a)() === add(a)(),
  $term([1]) === $term([1])
 )
