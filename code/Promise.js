const FULFILLED = Symbol('fullfiled');
const PENDING = Symbol('pending');
const REJECTED = Symbol('rejected');

const microtask = (fn) => {
    setTimeout(() => {
        fn(arguments)
    }, 0)
}

const resolvePromise = (promise, x, resolve, reject) => {
    // 确保 thenable 决议只被调用一次
    let thenCalledOrThrow = false;
    // 相等的情况会出现循环引用 例子 1
    if(x === promise) {
        return reject(new TypeError('Chaining cycle')) 
    }
    if(x instanceof Promise){
        return x.then((value) => {
            // x.then 返回的可能还是一个 promise 所以递归调用 resolvePromise
            resolvePromise(promise, value, resolve, reject)
        }, reject)
    }
    // 包含 then 方法的三方库，或者 thenable对象都可以去执行一遍 then 已兼容三方
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            // 拿到 x.then 的引用 以防止 是一个 getter 多起获取会发生变化
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x, (y) => {
                    if(thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return resolvePromise(promise, y, resolve, reject)
                }, (r) => {
                    if(thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(r)
                })
            }else{
                resolve(x)
            }
        } catch(e) {
            if(thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            reject(e)
        }
        return 
    }

    resolve(x)
}
class Promise {
    constructor(excuter){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if(this.status === PENDING){
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn(this.value))
            }
        }

        let reject = (reason) => {
            if(this.status === PENDING){
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn(this.reason))
            }
        }

        try {
            excuter(resolve, reject)
        } catch(e){
            reject(e)
        }
    }

    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {throw reason};
         
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === FULFILLED){
                microtask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e){
                        reject(e)
                    }
                })
                
            }
    
            if(this.status === REJECTED){
                microtask(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e){
                        reject(e)
                    }
                })
            }
    
            if(this.status === PENDING){
                this.onResolvedCallbacks.push((value) => {
                    microtask(() => {
                        try {
                            let x = onFulfilled(value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch(e){
                            reject(e)
                        }
                    })
                    
                })
                this.onRejectedCallbacks.push((reason)=> {
                    microtask(() => {
                        try {
                            let x = onRejected(reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch(e){
                            reject(e)
                        }
                    })
                    
                })
            }
        })

        return promise2
    }
}

Promise.resolve = (value) => {
    return new Promise((resolve) => {resolve(value)})
}

module.exports = Promise;

// 例子1
// const p = new Promise((resolve, reject) => {
//     resolve(1)
// })
// const p2 = p.then( res => {
//     console.log(res)
//     return p2
// }).then( res => {console.log(res)})


// const p = new Promise((resolve, reject) => {
//     setTimeout(function(){resolve(2)}, 2000)
// })
// p.then((res) => {console.log(res)}).then( res => console.log('res2', res))

Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4)
  }).then(res => {
    console.log(res)
  })
  
  Promise.resolve().then(() => {
    console.log(1);
  }).then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  }).then(() => {
    console.log(5);
  }).then(() =>{
    console.log(6);
  })