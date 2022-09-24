# common-plugs
```common-plugs ```是一个数据处理，文件压缩、转换、下载上传等功能的公共控件，空间的方法可通过解构的方式获得。下载安装可使用一下方式：
```
yarn add common-plugs 或 npm install common-plugs
```
```clone(obj)```在使用的过程中，可以直接在需要引用的组件引入或注入即可，例如：深拷贝一个对象，返回一个新对象
```
const { clone } = require("common-plugs")
const obj = {name: "Tom", age: 20, class: {school: "深圳大学"}}
const newObj = clone(obj)
```
# mergeObject() 合并对象
 ```mergeObject(obj1, obj2)``` 方法的作用是合并对象，可将两个对象相互合并成一个新对象，需要两个参数，参数1是要合并到的对象，参数2是将要被合并的对象，
 如果两个对象中有相同属性的情况，参数2的同属性将会覆盖参数中相同的属性。最后返回一个新的对象。
 例如：
 ```
const { mergeObject } = require("common-plugs")
const obj1 = {name: "Kimi", hobby: ["Play basketball", "travel"]}
const obj2 = {name: "Tom", age: 25; class: "深大商学院"}
const newObj = mergeObject( obj1, obj2 )
//最后输出  {name: "Tom", age: 25; class: "深大商学院", hobby: ["Play basketball", "travel"]}
```
# generateArray() 生成随机数
```generateArray(100, true)``` 方法，该方法可以生成n长度的0~n之间的随机数组，该方法有两个参数，第1个参数n为数值，表示需要生成的数组长度；第2个参数为布尔值，便是是否可出现重复
(true为不重复，false为可重复)，例如：
```
const { generateArray } = require("common-plugs")
const arr = generateArray(100, true)
```
# sortArray() 排序
```sortArray(arr)```方法，该方法用快速排序的方式该数值数组排序，该方法有两个参数，参数1为需要进行排序的数组；参数2为布尔值（默认为true-->升序，false--->降序），最后返回一个新数组，例如：
```
const { sortArray } = require("common-plugs")
const newArr = sortArray ([2,3,5,6,7,1,4,8,10,9])
// newArr 为[1,2,3,4,5,6,7,8,9,10]
```
# compress() 压缩
```compress(base64, scale, callback)``` 方法，该方法用于base64编码的压缩，compress有三个参数，参数1是源base64编码，参数2是一个回调函数，返回一个压缩后的base64编码，
参数3是压缩比例(可选)是设置压缩比例(0~1之间)，0.5则表示在源base64的基础上压缩50%; 例如
```
const { compress } = require("common-plugs")
compress(base64, (newBase64)=>{
    //  newBase64压缩后的base64
}, .5)
```
# netPathGetBlobAndBase64() 获取图片base64
```netPathGetBlobAndBase64(url, scale)```方法，该方法用于获取一张网络图像地址的base64编码，返回一个Promise对象，then()方法的参数是一个长度为2的数组，
数组第1个元素是网络图像的Blob对象，第2个元素为网络图像的base64编码；
该方法有两个参数，
参数1(url)为网络图片地址如```https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF ``` ,
参数2 (scale可选)为转成base64编码后需要压缩的比例(0~1之间)，0.5则表示在源base64的基础上压缩50%
例如：
```
const { netPathGetBlobAndBase64 } = require("common-plugs")
const promise = netPathGetBlobAndBase64(url, scale)
promise.then( res => {
     const obj = {blob: res[0], base64: res[1]}
})
```
# httpToCanvasGetBase64() 获取图片base64
```httpToCanvasGetBase64(url, scale)```方法，该方法与```netPathGetBlobAndBase64()```用法相同，不同的是返回的promise对象的参数中不是数组，而是一个base64编码，参数1是网络地址url，参数2是需要压缩的比例(0~1之间)例如
```
const { httpToCanvasGetBase64 } = require("common-plugs")
const promise = httpToCanvasGetBase64(url, scale)
promise.then( res => {
    let base64 = res
})
```
# downloads()下载
```downloads(param1, param2, param3)```方法，该方法有3个参数，可用于下载文件到本地，下载的文件类型可以是图片、视频、文本. 

参数1是需要下载的文件，参数类型也可以是网络图片、视频、文本地址，也可以是File文件对象、Blob对象类型，或者是本文字符串类型. 

参数2(可选)是文件名，可自定义需要下载的文件名，若不写则由系统默认生成；

参数3(可选)是文件格式，可以是文本格式如csv、excel、txt、docx等也可以是图片格式如jpeg、png、gif、webp等，
如果是视频格式的话同样也可以为mp4、avi等等。
用法：
```
const { downloads } = require("common-plugs")
const url = "https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF"
downloads(url, "我的图像", "jpeg")
```
# base64ToFile() 方法 base64转成File对象
```base64ToFile(base64, fileName)```方法，该方有两个参数，参数1需要转换的base64，参数2(可选)是文件名，如不写则默认生成；返回一个File对象。例如：
```
const { base64ToFile } = require("common-plugs")
const file = base64ToFile(base64, "我的图像")
```
# blobToFile() 方法是Blob对象转成File对象
```blobToFile(blob, fileName) ``` 该方法可用于将blob对象转成file对象，有两个参数，参数1是需要转换的blob对象，参数2(可选) 是blob对象的名称，不写系统将默认自动生成，例如：
```
const { blobToFile } = require("common-plugs")
const file = blobToFile(base64, "我的图像") 
```
# fileToBase64()方法 File对象转base64
```fileToBase64(file, scale)```方法，该方法用于将一个file对象转成base64编码，参数2 (file)是file文件对象，参数2（可选0~1之间）压缩比例，是用于将转换后的base64进行按比例压缩。例如：
```
const { fileToBase64 } = require("common-plugs")
const base64 = fileToBase64(file, scale)
```
# base64ToBlob()方法 base64转blob对象
```base64ToBlob(base64)```方法，用于将base64编码转成一个Blob对象，将返回一个Blob对象，有一个参数，参数为base64。例如：
```
const { base64ToBlob } = require("common-plugs")
const blob = base64ToBlob(base64)
```
# watermark 设置网页水印
```watermark(obj)```方法，该方法用于给网页添加水印，在需要添加水印的页面调用该方法即可。

方法的入参有两种方式。

方式1：追一传参，参数1是水印（可文字或图片<网络图片地址 & base64>）。参数2 是字体大小(文字入参有效)。参数3 透明度(0~1)，参数4旋转角度

方式2：对象入参```{image: '我是水印', size: 20, opacity:1, rotate: 0, family:'Arial',scale:1.2}```, 对象入参的时候只需要传递一个obj对象就可以

水印的文案可以是文字也可以直接是一张网络图片地址或者图片的base64编码。

用法例如：
```
用法1
const { watermark } = require("common-plugs")
watermark("我是水印", 20, .5, 1)

用法2
const { watermark } = require("common-plugs")
const url = "https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF"
watermark(url, 20, .5, 1)

用法3
const { watermark } = require("common-plugs")
const obj = {image: '我是水印', size: 20, opacity:1, rotate: 0, family:'Arial',scale:1.2}
watermark(obj)
```
# voice 语音合成播报
```voice(str)```方法，用于将文字合成语音，常见用途语音播报，语音提醒等。使用方法有两种入参配置方式。
1. 对象入参```voice({lang: 'zh-cn',text:'你有新的订单', volume: 1,pitch: 2,rate:1})```, lang播报语言，text提示语，volume音量(0~1，默认1)，pitch音色(0~2,默认1)
，rate语速(0.1~10, 默认1，值越大说话越快)；
2. 字符串入参，```voice('你有新的订单')```，可以只传入说话文字内容，其余的参数配置在实现方法中有默认设置。
```voice(str)```方法返回一个语音合成对象，用于控制语音播报的播放、暂停、继续播放、停止等
示例：
```
const { voice } = require("common-plugs")
const speech = voice("你有新的订单,请及时处理")
speech.pause()   // 调用此方法是暂停
speech.resume()  // 调用此方法是继续播报
speech.cancel()  // 调用此方法是停止播报
……
```