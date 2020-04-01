function getFn(o1, o2, skipSecond) {
  return (
    o1[o1.key]
  ) === (
    skipSecond ? o2 : o2[o2.key]
  )
}

function assignFn(v1, v2) {
  return v1 === v2
}

const s1 = "abc"
, s2 = "cba"
, l1 = new Array(1024**2).fill(0).map((_, i) => i).join('')
, l2 = new Array(1024**2).fill(0).map((_, i) => i).reverse().join('')
, strings = {s1, s2, l1, l2}
, values = Object.values(strings) 
, objs = Object.keys(strings).map(key => ({
   key,
   [key]: strings[key]
 }))
, fns = {
  get: () => {
    for (const o1 of objs)
      for (const o2 of objs) {
        o1[o1.key] === o2[o2.key]
        for (const v of values) {
          o1[o1.key] === v
          o2[o2.key] === v
        }
      }
  },
  assign: () => {
    for (const o1 of objs) {
      const v1 = o1[o1.key]
      for (const o2 of objs) {
        const v2 = o2[o2.key]
        v1 === v2
        for (const v of values) {
          v1 === v
          v2 === v
        }
      }
    }
  },
  getFn: () => {
    for (const o1 of objs)
      for (const o2 of objs) {
        getFn(o1, o2)
        for (const v of values) {
          getFn(o1, v, true)
          getFn(o2, v, true)
        }
      }
  },
  assignFn: () => {
    for (const o1 of objs) {
      const v1 = o1[o1.key]
      for (const o2 of objs) {
        const v2 = o2[o2.key]
        assignFn(v1, v2)
        for (const v of values) {
          assignFn(v1, v)
          assignFn(v2, v)
        }
      }
    }
  }  
}

// -- module --

const {performance} = require("perf_hooks")
, measured = {}
, measures = 1000**2
, cycles = 4
for (let i = cycles; i--; ) {
  for (const fn in fns) 
    measured[fn] = measure(measures, measured[fn], fns[fn])
}
console.log(prefiffyStats(measured))

function updateStats(stats, end, start) {
  for (const key in end) {
    stats[key] = stats[key] || {} // newNumberStat
    const d = end[key] - start[key]
    , stat = stats[key]
    stat.sum = (stat.sum || 0) + d
    stat.cycles = (stat.cycles || 0) + 1;
    
    (stat.min === undefined || stat.min > d) && (stat.min = d);
    (stat.max === undefined || stat.max < d) && (stat.max = d)
  }
  return stats
}

function prefiffyStats(stats) {
  $return = {}
  for(const key in stats) {
    $return[key] = {}
    const stat = stats[key]
    , $r = $return[key]
    for (const param in stat) {
      const {sum, cycles, min, max} = stat[param]
      , avg = sum / cycles
      , d = `${(
        Math.max(1 - avg/min, max/avg - 1)
        * 100).toFixed(1)
      }%`

      $r[param] = {
        avg: prettifyNumber(avg),
        d
      }
    }
  }
  return $return
}

function prettifyNumber(x) {
  const pwr = (Math.log10(x) / 3) | 0
  return `${
    (x / 10 ** (3 * (pwr))).toFixed(1)
  }${
    pwr ? ` *10^3*${pwr}`: ''
  }`
}

function measure(measures, stat = {}, fn) {
  gc()

  // mem0 = process.memoryUsage()
  const dp = performance.now()
  , start = performance.now()
  for (let i = measures; i--;)
    fn()
  const end = performance.now()
  // mem1 = process.memoryUsage()
  return updateStats(
    stat,
    //Object.assign(
      {time: end - start},
    // mem1),
    //Object.assign(
      {time: start - dp},
    // mem0)
  )
}