/** 文件处理模块**/
import files from "./files.js";
/** 数据处理模块**/
import datahandle from "./object.js";
/** 水印功能**/
import watermark from "./constant.js";
/** 模块导出**/
export default {
  ...files,
  ...datahandle,
  ...watermark
};