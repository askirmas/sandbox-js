const {pipe, piping} = require('./pipes')

describe('pipe', () => {
  test('pipe 0', () => expect(pipe(1) + 0).toBe(1))
  test('pipe 2', () => expect(pipe(1)(x => x + 1)(x => x + 1) + 0).toBe(3))
})
describe('piping', () => {
  test('val', () => expect(piping(1)(x => x + 1)).toBe(2))
  //test('piping 0', () => expect(piping({a: 1})).toBe({a:1}))
  test('piping 1', () => expect(piping({a: 1})(({a}) => a + 1)).toBe(2))

})
