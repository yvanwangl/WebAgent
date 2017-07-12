import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'common.homeHeader.logout.title',
        defaultMessage: '提示'
    },
    content: {
        id: 'common.homeHeader.logout.content',
        defaultMessage: '确定退出登录？'
    },
    okText: {
        id: 'common.homeHeader.logout.okText',
        defaultMessage: '确定'
    },
    cancelText: {
        id: 'common.homeHeader.logout.cancelText',
        defaultMessage: '取消'
    },
    partnerStaffName:{
        id:'common.userInfo.partnerStaffName',
        defaultMessage: '名称'
    },
    partnerStaffCode:{
        id:'common.userInfo.partnerStaffCode',
        defaultMessage: '编码'
    },
    role:{
        id:'common.userInfo.role',
        defaultMessage: '角色'
    },
    balance:{
        id:'common.userInfo.balance',
        defaultMessage: '余额'
    },
    balanceTitle:{
        id:'common.userInfo.balance.balanceTitle',
        defaultMessage: '查看余额'
    },
    modifyPassword:{
        id:'common.userInfo.modifyPassword',
        defaultMessage: '修改登录密码'
    },
    modifyPin:{
        id:'common.userInfo.modifyPin',
        defaultMessage: '修改支付密码'
    },
    logout:{
        id:'common.userInfo.logout',
        defaultMessage: '退出'
    }
});

export default messages;