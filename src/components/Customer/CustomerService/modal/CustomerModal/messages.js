import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'customer.customerService.modal.customerModal.title',
        defaultMessage: '编辑客户信息'
    },
    firstName: {
        id: 'customer.customerService.modal.customerModal.firstName',
        defaultMessage: '姓'
    },
    firstNameRule: {
        id: 'customer.customerService.modal.customerModal.firstNameRule',
        defaultMessage: '姓不能为空'
    },
    lastName: {
        id: 'customer.customerService.modal.customerModal.lastName',
        defaultMessage: '名'
    },
    lastNameRule: {
        id: 'customer.customerService.modal.customerModal.lastNameRule',
        defaultMessage: '名不能为空'
    },
    mobile: {
        id: 'customer.customerService.modal.customerModal.mobile',
        defaultMessage: '联系电话'
    },
    mobileRule: {
        id: 'customer.customerService.modal.customerModal.mobileRule',
        defaultMessage: '联系电话不能为空'
    },
    email: {
        id: 'customer.customerService.modal.customerModal.email',
        defaultMessage: '电子邮箱'
    },
    emailRule: {
        id: 'customer.customerService.modal.customerModal.emailRule',
        defaultMessage: '电子邮箱不合法'
    },
    address: {
        id: 'customer.customerService.modal.customerModal.address',
        defaultMessage: '地址'
    },
    addressRule: {
        id: 'customer.customerService.modal.customerModal.addressRule',
        defaultMessage: '地址不能为空'
    },
    successTitle: {
        id: 'customer.customerService.modal.customerModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'customer.customerService.modal.customerModal.successContent',
        defaultMessage: '修改成功！'
    },
});

export default messages;