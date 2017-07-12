import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.title',
        defaultMessage: '仓库调拨'
    },
    sourceOrganization: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.sourceOrganization',
        defaultMessage: '源组织'
    },
    organizationName: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.organizationName',
        defaultMessage: '目标组织'
    },
    resourceSpecClassName: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.resourceSpecClassName',
        defaultMessage: '资源规格分类名称'
    },
    resourceNumber: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.resourceNumber',
        defaultMessage: '源库存量'
    },
    targetResourceNumber: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.targetResourceNumber',
        defaultMessage: '目标库存量'
    },
    changeNumber: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.changeNumber',
        defaultMessage: '调拨数量'
    },
    changeNumberRule: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.changeNumberRule',
        defaultMessage: '调拨数量不能大于源库存量'
    },
    successTitle: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'dealer.dealerOrganization.organizationStock.transferModal.successContent',
        defaultMessage: '调拨成功！'
    },
});

export default messages;