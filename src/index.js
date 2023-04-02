/** 文件处理模块**/
const files  = require(`./files`)
/** 数据处理模块**/
const datahandle  = require(`./object`)
/** 水印功能**/
const watermark  = require(`./constant`)
/** 模块导出**/
module.exports = {
  ...files,
  ...datahandle,
  ...watermark
}