/**深拷贝/深度克隆
 *  @param obj要拷贝的原数据
 *  @param 返回一个新的对象
 * */
const clone = (obj) => {
    // 递归数组
    const _copyArr = (_arr, _r, _hash) => _r = _arr.map( v => copy(v, _hash))
    // 递归对象
    function _copyObj( _obj, _r, _hash) {
        for(let k in _obj) _r[k] = copy(_obj[k], _hash)
        return _r
    }
    // 递归Set对象
    const _copySet = (_set, _s = new Set()) => {
        _set.forEach( v => _s.add(v))
        return _s
    }
    // 递归Map对象
    const _copyMap = (_map, _resMap = new Map()) => {
        for(let [_k, _v] of _map) _resMap.set(_k, _v)
        return _resMap
    }
    // 递归WeekMap对象
    const _copyWeakMap = (_weakMap, _resWeakMap = new WeakMap()) => {
        for(let [_k, _v] of _weakMap) _resWeakMap.set(_k, _v)
        return _resWeakMap
    }
    // 当前值类型判断
    function copy( _obj, _hash = new WeakMap()) {
        // 基本类型直接返回
        if(typeof _obj === 'string' || typeof _obj === 'symbol' || typeof _obj === 'number' ||
            typeof _obj === 'boolean' || _obj === null || typeof _obj === 'undefined') {
            return _obj
        }else{
            // 单独判断引用类型和其他类型
            if(Array.isArray(_obj) || Object.prototype.toString.call(_obj) === '[object Object]'){
                if(_hash.has(_obj)) return _hash.get(_obj)
                let _r = _obj instanceof Array ? [] : {}
                _hash.set( _obj, _r )
                if( Array.isArray(_obj) ) return _copyArr( _obj, _r, _hash)
                if(Object.prototype.toString.call(_obj) === '[object Object]') return _copyObj( _obj, _r, _hash)
            }
            if(_obj instanceof RegExp) return new RegExp(_obj)
            if(_obj instanceof Date) return new Date(_obj)
            if(_obj instanceof Error) return new Error(_obj.message)
            if(_obj instanceof Function) return _obj.bind({})
            if(_obj instanceof Set) return _copySet(_obj)
            if(_obj instanceof Map) return _copyMap(_obj)
            if(_obj instanceof WeakMap) return _copyWeakMap(_obj)
        }
    }
    return copy(obj)
}
/** 合并对象：两个对象相互合并成一个对象
 *  相同属性参数2会替换参数里的相同属性的值
 *  @param 参数2会合并到参数1
 *  @param mer 返合并后的新对象
 * */
function mergeObject(..._obj){
    let mer = {};
    function merge(o){
        for(let _k in o){
            if(o.hasOwnProperty(_k)){
                if(Object.prototype.toString.call(o[_k]) === '[object Object]'){
                    mer[_k] = mergeObject(mer[_k], o[_k]);
                }else{
                    mer[_k] = o[_k];
                }
            }
        }
    }
    for(let i =0; i <_obj.length; i++) merge(_obj[i]);
    return mer;
}
/** 随机生成n个元素的数组
 *  @param 参数1 是数组长度，
 *  参数2 是否重复（默认false->重复随机数，true->不重复随机数）
 *  @return 返回一个新的固定长度的随机数数组
 * */
const generateArray = (_num, noRepeat=false,_arr=[], i = 0) => {
    while (i < _num){
        let _random = parseInt(Math.random() * 100)
        if(noRepeat){
            if( !_arr.includes(_random) ){
                _arr.push(_random)
                i++
            }
        }else {
            _arr.push(_random)
            i++
        }
    }
    return _arr
}
/**--------快速排序开始-------**/
function swap(A,i,j){
    [A[i],A[j]] = [A[j],A[i]]
}
// 返回中心点位置
function partition(A,lo,hi){
    //中心位置
    const pivot = A[hi - 1]
    let i = lo, j = hi -1
    // 小于中心点范围：[lo,i)
    // 未确认范围：[i,j)
    // 大于中心点范围：[j,hi - 1)
    while(i !== j){
        A[i] <= pivot ? i++ : swap(A,i,--j)
    }
    swap(A, j, hi - 1)
    return j
}
// 快速排序
function sortArray(A, bool =true, lo = 0, hi = A.length){
    if(hi - lo <= 1) return
    const p = partition(A,lo,hi);  // 返回一个中心点
    sortArray(A, lo, p);
    sortArray(A, p, hi);
    return bool ? A : A.sort((a,b)=> b - a)
}
/**--------快速排序结束-------**/


module.exports = {
    clone,
    mergeObject,
    generateArray,
    sortArray
}