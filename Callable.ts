/**
 * get()
 * (queries[]) => ([query.result])
 * (queries{}) => ({[query.key] :query.result})
 */

function queryStep<T, K extends keyof T>(target: T, key: K) :T[K] | undefined {
    try {
        return target[key]
    } catch(e) {
        
    }
}

function CL2(value) {
    const revoc = new Proxy(Function.prototype, {
        get(target, prop, receiver) {
            return prop === 'valueOf'
            ? () => value
            : prop === 'pipe'
            ? fn => new CL2(fn(value))
            : Reflect.get(target, prop, receiver)
        }
    })
    return revoc
}

const x = new CL2(1)
console.log(x + x.pipe(x => x + 1))

class CssVar {
    constructor(key) {
        this._key = key
    }
    valueOf() {
        return `var(--${this._key})`
    }
    toString() {
        return `--${this._key}`
    }
}
