import {defineMessages} from 'react-intl';

const messages = defineMessages({
    placeHolder: {
        id: 'common.checkCode.input.placeHolder',
        defaultMessage: '请输入验证码'
    },
    checkCode: {
        id: 'common.checkCode.input.checkCode',
        defaultMessage: '校验码'
    },
    checkCodeRule: {
        id: 'common.checkCode.input.checkCodeRule',
        defaultMessage: '校验码不能为空'
    },
    checkCodeError: {
        id: 'common.checkCode.input.checkCodeError',
        defaultMessage: '校验码错误'
    },
});

export default messages;