/**
 * Created by wyf on 2017/4/13.
 */
import {Modal} from 'antd';
import {routerRedux} from 'dva/router';
import errorMessages from './errorMessages';

/*错误编码格式化*/
function genErrorMessage(errorCode) {
    return errorCode
        .split('.')
        .map(str => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
        .join(' ');
}

/*后台错误格式化提示信息*/
function formatErrorCode(errorCode, errorLevel) {
    switch (errorLevel) {
        case 'ERROR':
            Modal.error({
                title: 'Error Message',
                content: genErrorMessage(errorCode),
            });
            break;
        case 'INFO':
            Modal.info({
                title: 'Info Message',
                content: genErrorMessage(errorCode),
            });
            break;
        case 'WARNING':
            Modal.warning({
                title: 'Warning Message',
                content: genErrorMessage(errorCode),
            });
            break;
    }
    /*如果登录超时，则重定向到登录页*/
    if(errorCode=='no.authentication.service'){
        window.location.replace("/agent-web/dist/index.html");
    }
}

export default formatErrorCode;