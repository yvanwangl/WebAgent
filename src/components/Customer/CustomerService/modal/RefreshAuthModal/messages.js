import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'customer.customerService.modal.refreshAuthModal.title',
        defaultMessage: '刷新授权'
    },
    reason: {
        id: 'customer.customerService.modal.refreshAuthModal.reason',
        defaultMessage: '刷新原因'
    },
    reasonRule: {
        id: 'customer.customerService.modal.refreshAuthModal.reasonRule',
        defaultMessage: '刷新原因不能为空'
    },
    checkCode: {
        id: 'customer.customerService.modal.refreshAuthModal.checkCode',
        defaultMessage: '校验码'
    },
    checkCodeRule: {
        id: 'customer.customerService.modal.refreshAuthModal.checkCodeRule',
        defaultMessage: '校验码不能为空'
    },
    successTitle: {
        id: 'customer.customerService.modal.refreshAuthModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'customer.customerService.modal.refreshAuthModal.successContent',
        defaultMessage: '刷新授权成功！'
    }
});

export default messages;