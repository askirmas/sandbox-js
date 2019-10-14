const pipeS = Symbol.for('pipe')

function chain(...fns) {
  switch(fns.length) {
    case 0:
      return x => x;
    case 1:
      return fns[0];
    default:
      return fns.reduce((head, fn) => arg => fn(head(arg)))
  }
} 

Object.defineProperties(
  Object.prototype, {
    [pipeS]: {
      value: function() {
        if (Function.prototype.isPrototypeOf(this))
          return chain(this, ...arguments)
        return chain(...arguments)(this)
      }    
    },
    p: {
      get() {
        return this[pipeS]
      }
    }
  }
)

const add = x => x + 1,
 idfn = x => x,
 idfnF = x => () => x
 , x = 2
console.log(
  x.p(add, add).p(add, add) === 6
)
/*const addF = x => () => x() + 1
// addF.p(addF)(() => 1)() == 3
console.log(2['p'].p(addF)() == 3)*/