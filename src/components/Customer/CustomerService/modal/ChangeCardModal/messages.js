import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'customer.customerService.modal.changeCardModal.title',
        defaultMessage: '物理产品更换'
    },
    smartCardCheckBox: {
        id: 'customer.customerService.modal.changeCardModal.smartCardCheckBox',
        defaultMessage: '智能卡更换'
    },
    stbCheckBox: {
        id: 'customer.customerService.modal.changeCardModal.stbCheckBox',
        defaultMessage: '机顶盒更换'
    },
    newCode: {
        id: 'customer.customerService.modal.changeCardModal.newCode',
        defaultMessage: '资源编码'
    },
    newCodeRule: {
        id: 'customer.customerService.modal.changeCardModal.newCodeRule',
        defaultMessage: '资源编码不能为空'
    },
    resourceStatus: {
        id: 'customer.customerService.modal.changeCardModal.resourceStatus',
        defaultMessage: '旧资源状态'
    },
    resourceStatusRule: {
        id: 'customer.customerService.modal.changeCardModal.resourceStatusRule',
        defaultMessage: '旧资源状态不能为空'
    },
    checkCode: {
        id: 'customer.customerService.modal.changeCardModal.checkCode',
        defaultMessage: '校验码'
    },
    checkCodeRule: {
        id: 'customer.customerService.modal.changeCardModal.checkCodeRule',
        defaultMessage: '校验码不能为空'
    },
    successTitle: {
        id: 'customer.customerService.modal.changeCardModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'customer.customerService.modal.changeCardModal.successContent',
        defaultMessage: '物理产品更换成功！'
    },
});

export default messages;