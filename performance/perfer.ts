export type NumberSnap<T extends string> = {[key in T]: number} 
export type NumberStats<T extends string> = {[key in T]: NumberStat} 
export type NumberStat = Record<"min"|"max"|"sum"|"cycles",number>
export {
  updateStats, newNumberStat
}

function newNumberStat(): NumberStat {
  return {
    min: Infinity,
    max: -Infinity,
    sum: 0,
    cycles: 0
  }
}

function updateStats<T extends string>(stats: NumberStats<T>, end: NumberSnap<T>, start: NumberSnap<T>) {
  for (const key in end) {
    stats[key] = stats[key] || {} // newNumberStat
    const d = end[key] - start[key]
    , stat = stats[key]
    stat.sum = (stat.sum ?? 0) + d
    stat.cycles = (stat.cycles ?? 0) + 1;
    
    (stat.min !== undefined && stat.min > d) && (stat.min = d);
    (stat.max !== undefined && stat.max < d) && (stat.max = d)
  }
}
