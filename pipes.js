function pipe(value) {
  const rev = Proxy.revocable(Function.prototype, {
    get(_target, prop, receiver) {
      return ['valueOf'].includes(prop)
      ? () => value
      /*: prop === Symbol.toPrimitive
      ? value*/
      :
        // should be value
        Reflect.get(_target, prop, receiver)
      },
      apply(_t, $this, args) {
        rev.revoke()
        return pipe(
          pipeApply.apply($this, [value, args])
          )
        }
  })
  return rev.proxy
}
    
function piping(value) {
  const $return = (...args) => pipeCall(value, ...args)
  try {
    Object.assign($return, value)
  } catch (e) {}
  Object.setPrototypeOf($return, Object.getPrototypeOf(value))
  return $return
}

function pipeApply(value, fns) {
  return fns.reduce((val, fn) => fn.call(this, val), value)
}
function pipeCall(value, ...fns) {
  return pipeApply.call(this, value, fns)
}

try {
  module.exports = {
    pipe, piping
  }
} catch (e) {}