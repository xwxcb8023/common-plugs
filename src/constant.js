/** 多媒体文件格式集合**/
const V_FORMAT = [".mp3",".mp4",".avi",".mov",".wmv",".rmvb",".mkv",".m4v",".rm",".3gp",".vob",".mpeg",".asf",".flv",".f4v",".flsh"]
/** 图像文件格式集合**/
const I_FORMAT = [".jpg",".jpeg",".png",".bmp",".tif",".gif",".pcx",".tga",".exif",".fpx",".svg",".psd","heic",".cdr",".pcd",".dxf",".ufo",".eps",".ai",".raw",".wmf",".webp",".avif",".apng"]
/** 文本文件格式集合**/
const T_FORMAT = [".txt",".rtf",".doc",".docx",".xls",".xlsx",".csv",".ppt",".html",".js",".css",".wpd",".pdf",".less",".sass",".tsx",".ts"]
/** base64编码正则**/
const REG_BASE64 = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i
/** 网络有效地址**/
const REG_HTTP = /^(http[s]{0,1}:\/\/|\\\\)/
module.exports = {
    V_FORMAT,
    I_FORMAT,
    T_FORMAT,
    REG_BASE64,
    REG_HTTP
}