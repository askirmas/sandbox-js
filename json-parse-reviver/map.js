const obj = {a: 1, b: {c: 3, d: 4}}
console.log(JSON.parse(JSON.stringify(obj), function(k,v) {
  if (v === null || typeof v !== 'object')
    return v
  return new Map(
    Object.keys(v)
    .map(k => [k, v[k]])
  )
}))