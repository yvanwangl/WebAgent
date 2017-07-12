import {defineMessages} from 'react-intl';

const messages = defineMessages({
    dealer: {
        id: 'subDealer.subDealer.dealer',
        defaultMessage: '代理商管理'
    },
    title: {
        id: 'subDealer.subDealer.title',
        defaultMessage: '下级代理商管理'
    },
    errorMessage: {
        sameName: {
            id: 'exist.the.same.name.organization',
            defineMessages: '父节点下存在相同名称的组织'
        }
    }
});

export default messages;