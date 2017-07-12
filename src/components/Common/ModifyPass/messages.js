/**
 * Created by hanlu on 2017/3/3.
 */
import {defineMessages} from 'react-intl';

const messages = defineMessages({
    loginPass: {
        id: 'common.modifyPass.loginPass',
        defaultMessage: '修改登录密码',
    },
    pinPass: {
        id: 'common.modifyPass.pinPass',
        defaultMessage: '修改支付密码',
    },
    oldPass: {
        id: 'common.modifyPass.oldPass',
        defaultMessage: '旧密码',
    },
    oldPassRequired: {
        id: 'common.modifyPass.oldPassRequired',
        defaultMessage: '旧密码不能为空',
    },
    newPass: {
        id: 'common.modifyPass.newPass',
        defaultMessage: '新密码',
    },
    notEqualToOld: {
        id: 'common.modifyPass.notEqualToOld',
        defaultMessage: '新密码不能和旧密码相同',
    },
    newPassRequired: {
        id: 'common.modifyPass.newPassRequired',
        defaultMessage: '新密码不能为空',
    },
    newLoginPassLength: {
        id: 'common.modifyPass.newLoginPassLength',
        defaultMessage: '新密码长度不能小于8位',
    },
    newPinPassLength: {
        id: 'common.modifyPass.newPinPassLength',
        defaultMessage: '新密码长度不能小于6位',
    },
    newPassRule: {
        id: 'common.modifyPass.newPassRule',
        defaultMessage: '新密码必须由数字和字母组成',
    },
    confirmPass: {
        id: 'common.modifyPass.confirmPass',
        defaultMessage: '确认密码',
    },
    confirmPassRequired: {
        id: 'common.modifyPass.confirmPassRequired',
        defaultMessage: '确认密码不能为空',
    },
    notEqualToNew: {
        id: 'common.modifyPass.notEqualToNew',
        defaultMessage: '确认密码不等于新密码',
    },
});

export default messages;
