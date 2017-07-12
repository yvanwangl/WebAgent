import {defineMessages} from 'react-intl';

const messages = defineMessages({
    customer: {
        id: 'customerService.customerService.customer',
        defaultMessage: '客户服务'
    },
    title: {
        id: 'customerService.customerService.title',
        defaultMessage: '客户服务'
    },
    nullSubscribersTitle: {
        id: 'customerService.customerService.nullSubscribersTitle',
        defaultMessage: '提示信息'
    },
    nullSubscribersContent: {
        id: 'customerService.customerService.nullSubscribersContent',
        defaultMessage: '没有找到符合条件的用户'
    },
    errorCodeTitle: {
        id: 'customerService.customerService.errorCodeTitle',
        defaultMessage: '错误提示'
    },
    errorCode: {
        'data.one.more': {
            id: 'customer.newSubscriberActive.newSubscriberActiveForm.errorCode.moreCustomersError',
            defaultMessage: '查询到多个客户，请重新输入查询条件'
        }
    }
});

export default messages;