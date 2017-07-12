import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.title',
        defaultMessage: '激活信息'
    },
    businessClass: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.businessClass',
        defaultMessage: '业务分类'
    },
    businessClassRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.businessClassRule',
        defaultMessage: '业务分类不能为空'
    },
    smartCardCode: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.smartCardCode',
        defaultMessage: '智能卡号'
    },
    smartCardCodeRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.smartCardCodeRule',
        defaultMessage: '智能卡号不能为空'
    },
    smartCardCodeLenRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.smartCardCodeLenRule',
        defaultMessage: '智能卡号应输入11位数字字符串'
    },
    stbCode: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.stbCode',
        defaultMessage: '机顶盒号'
    },
    stbCodeRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.stbCodeRule',
        defaultMessage: '机顶盒号不能为空'
    },
    stbCodeLenRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.stbCodeLenRule',
        defaultMessage: '机顶盒号应输入17位数字字符串'
    },
    customerName: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerName',
        defaultMessage: '姓名'
    },
    customerNameRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerNameRule',
        defaultMessage: '姓名不能为空'
    },
    customerFirstName: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerFirstName',
        defaultMessage: '姓'
    },
    customerFirstNameRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerFirstNameRule',
        defaultMessage: '姓不能为空'
    },
    customerLastName: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerLastName',
        defaultMessage: '名'
    },
    customerLastNameRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.customerLastNameRule',
        defaultMessage: '名不能为空'
    },
    mobileNumber: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.mobileNumber',
        defaultMessage: '联系电话'
    },
    mobileNumberRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.mobileNumberRule',
        defaultMessage: '联系电话不能为空'
    },
    email: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.email',
        defaultMessage: '电子邮箱'
    },
    emailRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.emailRule',
        defaultMessage: '电子邮箱不合法'
    },
    address: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.address',
        defaultMessage: '地址'
    },
    addressIdRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.addressIdRule',
        defaultMessage: '地址不能为空'
    },
    code: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.code',
        defaultMessage: '产品包'
    },
    codeRule: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.codeRule',
        defaultMessage: '产品包不能为空'
    },
    errorCodeTitle: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.errorCodeTitle',
        defaultMessage: '错误提示'
    },
    errorCode: {
        'the.smart.card.is.not.exist': {
            id: 'customer.newSubscriberActive.newSubscriberActiveForm.errorCode.smartCardCodeError',
            defaultMessage: '智能卡号不存在'
        },
        'the.decoder.card.is.not.exist': {
            id: 'customer.newSubscriberActive.newSubscriberActiveForm.errorCode.stbCodeError',
            defaultMessage: '机顶盒号不存在'
        }
    },
    successTitle: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'customer.newSubscriberActive.newSubscriberActiveForm.successContent',
        defaultMessage: '激活成功！'
    }
});

export default messages;