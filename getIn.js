function getIn(source, trajectory, index = 0) {
  if (!trajectory || !trajectory.length || trajectory.length < index + 1)
    return source
  return getIn(
    getByKey(source, trajectory[index]),
    trajectory,
    index + 1
  )
}

function getByKey(source, key) {
  return typeof source === 'function'
  ? source(key)
  : source.get
  ? source.get(key)
  : source.has
  ? source.has(key)
  : source[key]
}


function curryingF(fn, argc = undefined) {
  const c = fn.length || argc
  return c === 1
  ? fn
  : x => curryingF((...args) => fn(x, ...args), c - 1) 
}
function curryingL(fn, argc = undefined) {
  const c = fn.length || argc
  return c === 1
  ? fn
  : x => curryingL((...args) => fn(...args, x), c - 1) 
}


try {
  module.exports = {
    getIn,
    curryingF,
    curryingL
  }
} catch (e) {}