import {defineMessages} from 'react-intl';

const messages = defineMessages({
    organization: {
        id: 'dealer.dealerOrganization.rechargeModal.organization',
        defaultMessage: '组织充值'
    },
    subDealer: {
        id: 'dealer.dealerOrganization.rechargeModal.subDealer',
        defaultMessage: '下级代理商充值'
    },
    staff: {
        id: 'dealer.dealerOrganization.rechargeModal.staff',
        defaultMessage: '员工充值'
    },
    rechargeOutKey: {
        id: 'dealer.dealerOrganization.rechargeModal.rechargeOutKey',
        defaultMessage: '转出账户'
    },
    rechargeOutBalance: {
        id: 'dealer.dealerOrganization.rechargeModal.rechargeOutBalance',
        defaultMessage: '转出账户余额'
    },
    rechargeInName: {
        id: 'dealer.dealerOrganization.rechargeModal.rechargeInName',
        defaultMessage: '转入账户'
    },
    rechargeInBalance: {
        id: 'dealer.dealerOrganization.rechargeModal.rechargeInBalance',
        defaultMessage: '转入账户余额'
    },
    money: {
        id: 'dealer.dealerOrganization.rechargeModal.money',
        defaultMessage: '转账金额'
    },
    moneyRule: {
        id: 'dealer.dealerOrganization.rechargeModal.moneyRule',
        defaultMessage: '转账金额不能为空'
    },
    moneyMustThanZero: {
        id: 'dealer.dealerOrganization.rechargeModal.moneyMustThanZero',
        defaultMessage: '转账金额必须大于0'
    },
    moneyThanOutBalance: {
        id: 'dealer.dealerOrganization.rechargeModal.moneyThanOutBalance',
        defaultMessage: '转账金额不能大于转出账户余额'
    },
    pin: {
        id: 'dealer.dealerOrganization.rechargeModal.pin',
        defaultMessage: '支付密码'
    },
    pinRule: {
        id: 'dealer.dealerOrganization.rechargeModal.pinRule',
        defaultMessage: '支付密码不能为空'
    }
});

export default messages;