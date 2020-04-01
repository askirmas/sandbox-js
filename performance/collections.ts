import {Suite} from "benchmark"
const functions = [objectAssign, arrayPush, arrayAssign, mapSet]
, args: Record<string, Parameters<(typeof functions)[number]>> = {
  "10": [10],
  "10^3": [1000], 
  "10^5": [100000],
  "10^7": [10000000],
}

Object.keys(args)
.map(argName => {
  const runner = new Suite()
  
  for (const fn of functions)
    runner.add(`${fn.name}(${argName})`, () => fn(...args[argName]))

  runner
  .on('start, ')
  .on('cycle', ({target}: any) => console.log(`${target}`))
  .on('complete', function(this: Suite) {
    console.log('Fastest is ' + this.filter('fastest').map(
      //@ts-ignore
      'name'
    ))
  })
  return [argName, runner] as [string, Suite]
})
.forEach(([name, x]) => x.run({name}))


function objectAssign(count: number) {
  const $return: Record<number, any> = {}
  for (let i = 0; i < count; i++)
    $return[i] = 0
  return $return
}

function arrayAssign(count: number) {
  const $return: Record<number, any> = []
  for (let i = 0; i < count; i++)
    $return[i] = 0
  return $return
}

function arrayPush(count: number) {
  const $return = []
  for (let i = 0; i < count; i++)
    $return.push(0)
  return $return
}

function mapSet(count: number) {
  const $return: Map<number, any> = new Map()
  for (let i = 0; i < count; i++)
    $return.set(i, 0)
  return $return
}
