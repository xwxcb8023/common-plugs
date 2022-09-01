const path = require("path").resolve(__dirname)
/** 所有模块对象**/
const result = require(`${path}/index`)
/** 模块导出**/
module.exports = { ...result }