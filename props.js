function C1() {
    this.p0 = "p0"
    this[Symbol('s0')] = 's0'
}
const o1 = new C1
o1[Symbol('s1')] = 's1'
console.log(Object.keys(o1))
console.log(Object.getOwnPropertyDescriptors(o1))
console.log(Object.getOwnPropertyNames(o1))
console.log(Object.getOwnPropertySymbols(o1))