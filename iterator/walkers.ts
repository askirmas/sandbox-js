import {asArguments} from "./constructors"

export {
  keys, values,
  inDepth
}

function* keys<T extends Object>(source: T) {
  for (const key in source)
    yield key
}
function* values<T extends Object>(source: T) {
  for (const key in source)
    yield source[key]
}

function* inDepth<T extends Object, R extends Object = T>(
  source: T,
  //@ts-ignore
  root: R = source
) :Iterable<any>{
  for (const key in source) {
    if (typeof source[key] !== 'object')
    //@ts-ignore
      yield asArguments(source[key], key, source, root)
    else {
      const value = source[key]
      if (value === null)
      //@ts-ignore
        yield asArguments(null, key, source, root)
      else
        yield* inDepth(value, root)
    }
  }
}
