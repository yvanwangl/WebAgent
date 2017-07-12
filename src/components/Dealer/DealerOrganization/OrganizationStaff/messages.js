import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'dealer.dealerOrganization.organizationStaff.title',
        defaultMessage: '员工信息'
    },
    addButton: {
        id: 'dealer.dealerOrganization.organizationStaff.addButton',
        defaultMessage: '新增'
    },
    modifyButton: {
        id: 'dealer.dealerOrganization.organizationStaff.modifyButton',
        defaultMessage: '修改'
    },
    rechargeButton: {
        id: 'dealer.dealerOrganization.organizationStaff.rechargeButton',
        defaultMessage: '充值'
    },
    errorMessage: {
        sameMobilePhone: {
            id: 'exist.the.same.name.sameMobilePhone',
            defineMessages: '该联系电话已经被使用！'
        }
    }
});

export default messages;