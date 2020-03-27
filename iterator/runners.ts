export {
  map
}

function* map<T, O>(source: Iterable<T>, callback: (arg: T, index: number) => O) {
  let i = 0
  for (const value of source)
    yield callback(value, i++)
}
/*
function* all<T>(..._: Iterable<T>[]) {

}
*/