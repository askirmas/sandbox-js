function* keysGen(source) {
  for (const key in source)
    yield key
}

function* recursiveDepth(source, root = source) {
  for (const key in source) {
    if (typeof source[key] !== 'object')
      yield args(source[key], key, source, root)
    else {
      const value = source[key]
      if (value === null)
        yield args(null, key, source, root)
      else
        yield* recursiveDepth(value, root)
    }
  }
}

function* recursiveWide(source, root = source) {
  const recurent = new WeakSet()
  for (const key in source) {
    if (typeof source[key] !== 'object')
      yield args(source[key], key, source, root)
    else {
      const value = source[key]
      if (value === null)
        yield args(null, key, source, root)
      else
        recurent.add(value)
    }
  }
  for (const value of recurent)
    yield* recursiveWide(value, root)
} 

function args() {
  return arguments
} 

const x = {"null": 1, a: {b:1, c: 2}, c: null}
, iterDepth = recursiveDepth(x)
, iterWide = recursiveDepth(x)

console.log(iterDepth.next().value)
console.log(iterWide.next().value)

console.log([...iterDepth])
console.log([...iterWide])
