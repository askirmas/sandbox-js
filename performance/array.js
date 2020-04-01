const {performance} = require("perf_hooks")

const idfn = x => x

const arr = new Array(1000).fill(0)
let value = []

const measured = [0, 0]
, measures = 1000
let start = 0

for (let i = measures; i--; ) {
  const dp = performance.now() - performance.now()
 
  value = []
  start = performance.now()
  for (let i = measures; i--; ) 
    value = arr.map(x => x)
  
  measured[0] += performance.now() - start - dp

  value = []
  
  start = performance.now()
  
  for (let i = measures; i--; ) {
    value = arr.map(idfn)
  }

  measured[1] += performance.now() - start - dp
}

console.log(measured)
