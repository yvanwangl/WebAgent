import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'report.balanceChange.balanceChangeSearchForm.title',
        defaultMessage: '查询条件'
    },
    partnerName: {
        id: 'report.balanceChange.balanceChangeSearchForm.partnerName',
        defaultMessage: '代理商'
    },
    partnerNameRule: {
        id: 'report.balanceChange.balanceChangeSearchForm.partnerNameRule',
        defaultMessage: '代理商不能为空'
    },
    partnerAccountName: {
        id: 'report.balanceChange.balanceChangeSearchForm.partnerAccountName',
        defaultMessage: '账户'
    },
    partnerAccountNameRule: {
        id: 'report.balanceChange.balanceChangeSearchForm.partnerAccountNameRule',
        defaultMessage: '账户不能为空'
    },
    date: {
        id: 'report.balanceChange.balanceChangeSearchForm.date',
        defaultMessage: '日期'
    },
    dateRule: {
        id: 'report.balanceChange.balanceChangeSearchForm.dateRule',
        defaultMessage: '日期不能为空'
    },
    dateItem: {
        today: {
            id: 'report.balanceChange.balanceChangeSearchForm.dateItem.today',
            defaultMessage: '今天'
        },
        latestWeek: {
            id: 'report.balanceChange.balanceChangeSearchForm.dateItem.latestWeek',
            defaultMessage: '上周'
        },
        latestMonth: {
            id: 'report.balanceChange.balanceChangeSearchForm.dateItem.latestMonth',
            defaultMessage: '上月'
        },
        other: {
            id: 'report.balanceChange.balanceChangeSearchForm.dateItem.other',
            defaultMessage: '其他'
        }
    },
    queryButton: {
        id: 'report.balanceChange.balanceChangeSearchForm.queryButton',
        defaultMessage: '查询'
    },
    resetButton: {
        id: 'report.balanceChange.balanceChangeSearchForm.resetButton',
        defaultMessage: '重置'
    }
});

export default messages;