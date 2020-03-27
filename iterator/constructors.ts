export {
  asArguments, iter1, iter2, iter3
}
function asArguments<T>(..._: T[]) {
  return arguments
}
type x = Generator
function* iter1<T1>(x1: T1) {
  yield x1
}
function* iter2<T1,T2>(x1:T1, x2:T2) {
  yield x1
  yield x2
}
function* iter3<T1,T2,T3>(x1:T1, x2:T2, x3:T3) {
  yield x1
  yield x2
  yield x3
}