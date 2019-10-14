const {getIn, curryingF, curryingL, pipe} = require('./getIn')

const adds = [[], [1,2]]
, addM = x => y => x + y
, addC = x => adds[x]
, sum3 = (x,y,z) => x + y * z
;

[
  [
    getIn, [
      ['empty trajectory', [getIn], 'toBe', getIn],
      ['array 1', [[[1, 3], 2], [1]], 'toBe', 2],
      ['array 2', [[[1, 3], 2], [0, 1]], 'toBe', 3],
      ['object 1', [{"a": {"c": 1}, "b": 2}, ["b"]], 'toBe', 2],
      ['object 2', [{"a": {"c": 1}, "b": 2}, ["a", "c"]], 'toBe', 1],
      ['call1', [adds, [1, 1]], 'toBe', 2],
      ['call2', [addM, [1, 1]], 'toBe', 2],
      ['call3', [addC, [1, 1]], 'toBe', 2]
    ]
  ]
].forEach(([fn, tests]) => describing(fn, tests))

describe('currying', () => {
  test('curryingF', () => expect(
    curryingF(sum3)(1)(2)(3)
  ).toBe(7))
  test('curryingL', () => expect(
    curryingL(sum3)(1)(2)(3)
  ).toBe(5))
}) 

function describing(fn, tests) {
  return describe(fn.name, () => tests.forEach(args => testing(fn, ...args)))
}

function testing(fn, label, ...args) {
  return test(label, expecting(fn, ...args))
}

function expecting(fn, args, assert, compare) {
  return () => expect(
    fn(...args)
  )[assert](compare)
}
