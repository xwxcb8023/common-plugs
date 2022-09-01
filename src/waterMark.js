const path = require("path").resolve(__dirname)
const {mergeObject} = require(`${path}/object`)
const {netPathGetBlobAndBase64} = require(`${path}/files`)
const {REG_BASE64, REG_HTTP} = require(`${path}/constant`)
// 生成base64图像编码
function getBase64 (data) {
    const {image, size, rotate, opacity, family, scale} = data
    const hasCans = document.getElementById("_canvas")
    const canvas = hasCans || document.createElement('canvas')
    canvas.setAttribute("id", "_canvas")
    const ctx = canvas.getContext('2d')
    let width = 100 * scale, height = 100 * scale;
    if(typeof image === 'string'){
        width = size * image.length * scale;
        height = size * image.length * scale;
    }
    canvas.width = width
    canvas.height = height
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#000'
    ctx.font = `${size}px ${family}`
    ctx.globalAlpha = opacity
    ctx.translate(-( x+size ) / 2, -(y+size));
    ctx.rotate( (Math.PI / 180) * rotate)
    if(Object.prototype.toString.call(image) === '[object HTMLImageElement]'){
        let xw = image.width/ (image.width / width), yh = image.height/ (image.height / height)
        let x = (width - image.length * size) / 2, y = height / 2;
        ctx.drawImage(image, width / 4, height / 4, xw / 2, yh / 2)
    }else{
        ctx.fillText(image, x,  y)
    }
    const base64 = canvas.toDataURL('image/webp')
    console.log("====>>",base64)
    return base64
}
// 绘制
function paintRender(base64){
    const style = `
             position: fixed;
             top:0px;
             left:0px;
             right:0px;
             bottom:0px;
             z-index:999;
             pointer-events:none;
             background:url('${base64}')  center repeat;
         `;
    const wm = document.getElementById('waterMark')
    const newWaterMarkDom = wm || document.createElement("div")
    newWaterMarkDom.setAttribute('id', 'waterMark')
    newWaterMarkDom.setAttribute('style', style)
    document.body.appendChild(newWaterMarkDom)
}
// 数组类型单位转换
function handler_arr_data(obj, _arr){
    if(_arr.length === 1){
        obj.image = _arr[0]
    }else if(_arr.length === 2){
        obj.image = _arr[0]
        obj.size = _arr[1]
    }else if(_arr.length === 3){
        obj.image = _arr[0]
        obj.size = _arr[1]
        obj.opacity = _arr[2]
        obj.rotate = _arr[3]
    }else if(_arr.length === 4){
        obj.image = _arr[0]
        obj.size = _arr[1]
        obj.opacity = _arr[2]
        obj.rotate = _arr[3]
    }
    return obj
}
// 监听参数的变化
function watchProxy(_obj){
    const proxy = new Proxy(_obj, {
        get(target, propName){
            return Reflect.get(target, propName)
        },
        set(target, p, value) {
            return Reflect.set(target, p, value)
        },
        deleteProperty(target, p) {
            return Reflect.defineProperty(target, p)
        }
    })
    const base64 = getBase64(proxy)
    paintRender(base64)
}
// 图片类型转成image对象
function rotateImageCode(newObj){
    const image = new Image()
    image.src = newObj.image
    image.onload = function (){
        newObj.image = image
        watchProxy(newObj)
    }
}
/**水印入口
 *  @params 可对象入参 也可逐个传递
 *  逐个传递： 参数1是水印（可文字或图片<网络图片地址 & base64>）
 *  参数2 是字体大小(文字入参有效)，参数3 透明度(0~1)，参数4旋转角度
 * */
function watermark(...value){
    let newObj = {image: '我是水印', size: 20, opacity:1, rotate: 0, family:'Arial',scale:1.2}
    value.forEach( v => {
        if(Object.prototype.toString.call(v) === '[object Object]'){
            newObj = mergeObject(newObj, v)
        }else {
            newObj = handler_arr_data(newObj, value)
        }
    })
    if(REG_HTTP.test(newObj.image)){
        netPathGetBlobAndBase64(newObj.image).then( res => {
            newObj.image = res[1]
            rotateImageCode(newObj)
        })
    }else if(REG_BASE64.test(newObj.image)){
        rotateImageCode(newObj)
    }
    watchProxy(newObj)
}

module.exports = {
    watermark
}