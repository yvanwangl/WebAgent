import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'dealer.subDealer.subDealerStock.saleModal.title',
        defaultMessage: '仓库销售'
    },
    sourceOrganization: {
        id: 'dealer.subDealer.subDealerStock.saleModal.sourceOrganization',
        defaultMessage: '源组织'
    },
    destinationOrganizationName: {
        id: 'dealer.subDealer.subDealerStock.saleModal.destinationOrganizationName',
        defaultMessage: '目标组织'
    },
    resourceSpecClassName: {
        id: 'dealer.subDealer.subDealerStock.saleModal.resourceSpecClassName',
        defaultMessage: '资源规格分类名称'
    },
    resourceNumber: {
        id: 'dealer.subDealer.subDealerStock.saleModal.resourceNumber',
        defaultMessage: '源库存量'
    },
    targetResourceNumber: {
        id: 'dealer.subDealer.subDealerStock.saleModal.targetResourceNumber',
        defaultMessage: '目标库存量'
    },
    changeNumber: {
        id: 'dealer.subDealer.subDealerStock.saleModal.changeNumber',
        defaultMessage: '销售数量'
    },
    changeNumberRule: {
        id: 'dealer.subDealer.subDealerStock.saleModal.changeNumberRule',
        defaultMessage: '销售数量不能大于源库存量'
    },
    successTitle: {
        id: 'dealer.subDealer.subDealerStock.saleModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'dealer.subDealer.subDealerStock.saleModal.successContent',
        defaultMessage: '销售成功！'
    }
});

export default messages;