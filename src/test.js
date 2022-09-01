
function fn(){
    const params = window.location.search.split("?")[1]
    let arr = params.split("&")
    const obj = {}
    arr.forEach( (v) =>  obj[v.split("=")[0]] = v.split("=")[1] )
    return obj
}
console.log(fn())

const arr1 =[ {id:1, age:25,}, {id: 2, age: 26}]
const arr2 = [{key: "id", val: 1, hand: {address:'深圳'}},{key:"id", val: 2, hand: {address: "北京"}}]
function fn(a,b) {
    const arr = []
    a.forEach( v => {
        b.forEach( _v =>
            v.id === _v.val && arr.push(Object.assign(v, {hand: _v.hand}))
        )
    })
    return arr
}
console.log(fn(arr1,arr2))