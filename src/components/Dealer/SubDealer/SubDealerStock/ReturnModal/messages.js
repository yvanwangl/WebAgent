import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'dealer.subDealer.subDealerStock.returnModal.title',
        defaultMessage: '仓库退还'
    },
    sourceOrganization: {
        id: 'dealer.subDealer.subDealerStock.returnModal.sourceOrganization',
        defaultMessage: '源组织'
    },
    destinationOrganizationName: {
        id: 'dealer.subDealer.subDealerStock.returnModal.destinationOrganizationName',
        defaultMessage: '目标组织'
    },
    resourceSpecClassName: {
        id: 'dealer.subDealer.subDealerStock.returnModal.resourceSpecClassName',
        defaultMessage: '资源规格分类名称'
    },
    resourceNumber: {
        id: 'dealer.subDealer.subDealerStock.returnModal.resourceNumber',
        defaultMessage: '源库存量'
    },
    targetResourceNumber: {
        id: 'dealer.subDealer.subDealerStock.returnModal.targetResourceNumber',
        defaultMessage: '目标库存量'
    },
    changeNumber: {
        id: 'dealer.subDealer.subDealerStock.returnModal.changeNumber',
        defaultMessage: '退还数量'
    },
    changeNumberRule: {
        id: 'dealer.subDealer.subDealerStock.returnModal.changeNumberRule',
        defaultMessage: '退还数量不能大于源库存量'
    },
    successTitle: {
        id: 'dealer.subDealer.subDealerStock.returnModal.successTitle',
        defaultMessage: '成功提示'
    },
    successContent: {
        id: 'dealer.subDealer.subDealerStock.returnModal.successContent',
        defaultMessage: '退还成功！'
    },
});

export default messages;