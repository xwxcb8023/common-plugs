const path = require("path").resolve(__dirname)
/** 文件处理模块**/
const files  = require(`${path}/files`)
/** 数据处理模块**/
const datahandle  = require(`${path}/object`)
/** 水印功能**/
const watermark  = require(`${path}/constant`)
/** 模块导出**/
module.exports = {
    ...files,
    ...datahandle,
    ...watermark
}