/**
 * Created by wyf on 2017/6/22.
 */
/*跨域请求配置参数修改*/
const debug = process.env.NODE_ENV !== 'production';

//开发模式，跨域请求
//跨域请求url
const httpServerCors = 'http://localhost:8088/agent-web';
//跨域请求头配置
const defaultOptionsCors = {
     mode: 'cors',
     credentials: 'include',
     headers: {
        'content-type': 'application/json'
     },
 };

//部署模式，同域请求
// 同域请求url
const httpServerSameOrigin = '/agent-web';
//同域请求头配置
const defaultOptionsSameOrigin = {
    credentials: 'same-origin',
    headers: {
        'content-type': 'application/json'
    },
};

module.exports = {
    httpServer: debug ? httpServerCors : httpServerSameOrigin,
    defaultOptions: debug ? defaultOptionsCors : defaultOptionsSameOrigin
};