import {performance} from "perf_hooks"

function idfn<T>(x: T) {
  return x
}

const measured = [0, 0]

, measures = 100000
let start = 0

console.log(process.memoryUsage())

for (let i = measures; i--; ) {
  let value = "1"
  const dp = performance.now() - performance.now()
  start = performance.now()
  for (let i = measures; i--; ) {
    value = "1"
  }
  measured[0] += performance.now() - start - dp

  start = performance.now()
  for (let i = measures; i--; ) {
    value = idfn("1")
  }
  measured[1] += performance.now() - start - dp
}

console.log(measured)
console.log(process.memoryUsage())
