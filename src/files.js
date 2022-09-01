const path = require("path").resolve(__dirname)
// 常量值
const { V_FORMAT, I_FORMAT, T_FORMAT, REG_BASE64, REG_HTTP}  = require(`${path}/constant`)
/**压缩base64编码
 *  @param base64 需要压缩的源base64
 *  @param callback 回调函数
 *  @param scale 压缩倍数(0~1之间)
 * */
const compress = (base64, callback, scale=1)=>{
    const canvas = document.createElement("canvas")
    const cxt = canvas.getContext("2d")
    const image = new Image()
    image.setAttribute("crossOrigin","anonymous");
    image.src = base64
    image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        cxt.drawImage(image, 0, 0, image.width, image.height)
        callback( canvas.toDataURL("image/jpeg", scale) )
        canvas = null
        cxt = null
    }
}
/**HTTP获取网络文件
 *  @param imgUrl 是网络图片地址
 *  @return 返回一个Promise对象数组[Blob、base64]
 * */
const  netPathGetBlobAndBase64 = (imgUrl, scale=1) => {
    function _getFileBlob (resolve, reject, imgUrl){
        window.URL = window.URL || window.webkitURL;
        const xhr =  XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP")
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                const blob = this.response;
                // 至关重要
                const oFileReader = new FileReader();
                oFileReader.readAsDataURL(blob);
                oFileReader.onloadend = function (e) {
                    // 此处拿到的已经是 base64的图片了
                    resolve( [blob, e.target.result] )
                };
            }else{
                reject("读取失败！")
            }
        }
        xhr.send();
    }
    return new Promise((resolve, reject)=>{
        _getFileBlob(resolve, reject, imgUrl)
    })
}
/**canvas获取网络图片base64
 *  @param url 是网络图片地址
 *  @return 返回一个Promise对象(base64)
 * */
const httpToCanvasGetBase64 = (url, scale =1) => {
    let canvas = document.createElement("canvas");
    let cxt = canvas.getContext("2d");
    let image = new Image();
    image.setAttribute("crossOrigin","anonymous");
    image.src= url;
    let promise = new Promise((resolve,reject)=>{
        image.onload = function(){
            canvas.width = this.width;
            canvas.height = this.height;
            cxt.drawImage(this,0,0);
            p = canvas.toDataURL("image/jpeg", scale);
            if(p != undefined && p != null) {
                resolve(p);
            }else{
                reject("获取base失败");
            }
        }
    });
    return promise;
}
/** 将file文件转成base64编码( 异步 )
 *  @param blob file文件
 *  @param scale 可选 是否压缩(压缩比例0~1之间)
 *  @reruen 返回一个promise对象base64
 * */
const fileToBase64 = ( file, scale = 1 ) => {
    const blob = new FileReader()
    blob.readAsDataURL(file)
    return new Promise((resolve, reject)=>{
        blob.onload = function (event){
            event.target.result ? compress(event.target.result, resolve, scale) : reject("读取失败！")
        }
    })
}
/** base64转成Blob
 *  @param base64 源数据
 *  @reruen 返回一个Blob对象
 * */
const base64ToBlob = (base64) => {
    const _arr = base64.split(";base64,") // 截取base64编码头部和实体部分存在数组中
    const format = _arr[0].split(":")[1]    // 获取文件格式
    const _str = window.atob(_arr[1])    // base64解码得到编码字符串
    let len = _str.length  // 获取编码字符串的长度
    const unti8Arr = new Uint8Array(len)  // 创建一个8位无符号整型数组
    while (len--){   //循环将字符编码存到整型数组中
        unti8Arr[len] = _str.charCodeAt( len )
    }
    return new Blob([unti8Arr], {type: format})  // 返回一个blob对象
}
/** Blob转成File对象
 *  @param Blob 源数据
 *  @param fileName 要定义的文件名(可选)
 *  @reruen 返回一个File文件对象
 * */
const blobToFile = (blob, fileName="xwxcb"+Date.now() ) => {
    return new File(
        [blob],   // blob流文件
        fileName+"."+blob.type.split("/")[1],    // 文件名
        { type: blob.type, lastModified: Date.now() }   // 格式配置
    );
}
/** Base64转成File对象
 *  @param Base64 源数据
 *  @param fileName 要定义的文件名(可选)
 *  @reruen 返回一个File文件对象
 * */
const base64ToFile = (base64, filename = "xwxcb"+Date.now() ) => {
    let arr = base64.split(',')
    let mime = arr[0].match(/\:(.*?);/)[1]
    let suffix = arr[0].match(/\/(.*?);/)[1]  // 图片后缀
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {    u8arr[n] = bstr.charCodeAt(n)  }
    return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}
/**正在下载ing
 *  @params 参数1 文件，参数2 名称，参数3 格式，参数4类型
 * */
function downloading (chars, filename, format, suffix){
    // 把数据转成Blob对象
    const blob = new Blob([chars], { type: suffix });
    const _url = URL.createObjectURL(blob);  // 获取blob下载地址
    // 开始下载
    const link = document.createElement("a");
    link.download = `${filename}${format.toLowerCase()}`;
    link.href = _url;
    link.click();
}
/** 文件下载
 *  @param 参数1是需要下载的文件，
 *  参数2是文件名(可选),参数3文件格式(可选)
 * */
function download(...params){
    const len = params.length
    let chars = params[0], filename=`xwxcb${Date.now()}`;
    // 截取.后面部分的 格式类型
    const _format = (_type) => _type.match(/\/(.*)/)[1];
    // 检查源数据格式
    function getformat( buffer ){
        if(Object.prototype.toString.call(buffer) === '[object Blob]') return '.'+_format( buffer.type )
        if(Object.prototype.toString.call(buffer) === '[object File]') return '.'+_format( buffer.type )
        return ''
    }
    // 给格式自动加"."
    let format = getformat( chars ) ? getformat( chars ) : ".csv";
    // 检查格式有没有带"."自动加上
    const hasStr = (_str) => {
        return  _str.toLowerCase().charAt(0) === "." ? _str.toLowerCase() : "."+_str.toLowerCase()
    }
    // 检查是否是有效文件格式
    function hasformat( type ){
        if(V_FORMAT.join("").indexOf( hasStr( type ) ) > -1) return true
        if(I_FORMAT.join("").indexOf( hasStr( type ) ) > -1) return true
        if(T_FORMAT.join("").indexOf( hasStr( type ) ) > -1)  return true
        return false
    }
    // 判断参数个数并自动匹配
    if( len === 2 && !hasformat( params[1].toLowerCase() ) ){
        filename = params[1].replace('.', '')
    }else if( len === 2 && hasformat( params[1].toLowerCase() ) ){
        format = hasStr( params[1] )
    }else if(len === 3){
        filename = params[1]
        format = params[2]
    }
    // 自动读取转化需要对应的文件类型
    function resultFormat (_type){
        if(_type !== '' && V_FORMAT.join("").indexOf(_type ) > -1) return `video/${_type}`.replace('.', '')
        if(_type !== '' && I_FORMAT.join("").indexOf(_type) > -1) return `image/${_type}`.replace('.', '')
        if(_type !== '' && T_FORMAT.join("").indexOf(_type) > -1) return  `text/${_type}, charset=UTF-8`.replace('.', '')
    }
    // 获取转化需要对应的文件类型
    let suffix = resultFormat( hasStr(format) )
    // 下载中
    downloading (chars, filename, format, suffix)
}
/** 文件下载入口
 *  @param 参数1是需要下载的文件，
 *  参数2是文件名(可选),参数3文件格式(可选)
 * */
function downloads(...params) {
    const [data, ...other] = params
    // 1. 判断参数是否是网络文件
    if (typeof data === 'string' && REG_HTTP.test(data)) {
        try {
            // 是网络上的文件需要先通过get请求去下载，转成blob对象再下到本地
            netPathGetBlobAndBase64( data, 0.3).then( ( res ) => {
                REG_BASE64.test(res[1]) ? download(res[0], ...other) : alert("不是文件网络有效地址")
            }).catch( err =>  console.log(err))
        }catch (e) {
            console.log(e)
        }
    }else if(typeof data === 'string' && REG_BASE64.test(data)) {
        // 2. 如果是base64编码的文件则转成blob对象进行下载
        download( base64ToBlob( data ), ...other)
    }else{
        // 3. 其他类型走正常下载流程
        download( data, ...other)
    }
}

module.exports = {
    compress,
    netPathGetBlobAndBase64,
    httpToCanvasGetBase64,
    fileToBase64,
    base64ToBlob,
    blobToFile,
    base64ToFile,
    downloads
}