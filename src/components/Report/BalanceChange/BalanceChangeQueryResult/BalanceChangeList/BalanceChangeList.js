import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {dateFormat, numberFormat} from '../../../../../utils/util';
import {Table} from 'antd';
import messages from './messages';
import styles from './index.css';

const balanceChangeListPropTypes = {
    balanceChangeRecords: PropTypes.array.isRequired,
    loading: PropTypes.bool
};
class BalanceChangeList extends Component {

    constructor(props) {
        super(props);
        const {intl: {formatMessage}} = this.props;
        /*激活用户表格列定义*/
        this.columns = [
            {
                title: formatMessage(messages.createInstant),
                dataIndex: 'createInstant',
                key: 'createInstant',
                render: (text, record, index)=> dateFormat(new Date(text))
            },
            {
                title: formatMessage(messages.amount),
                dataIndex: 'amount',
                key: 'amount',
                className: 'columnMoney',
                render: (text, record, index)=> numberFormat(text)
            },
            {
                title: formatMessage(messages.lastAmount),
                dataIndex: 'lastAmount',
                key: 'lastAmount',
                className: 'columnMoney',
                render: (text, record, index)=> numberFormat(text)
            },
            {
                title: formatMessage(messages.fromAccountName),
                dataIndex: 'fromAccountName',
                key: 'fromAccountName'
            },
            {
                title: formatMessage(messages.toAccountName),
                dataIndex: 'toAccountName',
                key: 'toAccountName'
            },
            {
                title: formatMessage(messages.createCode),
                dataIndex: 'createCode',
                key: 'createCode',
                render: (text, record, index) => <span>{`${text} ${record.partnerStaffName}`}</span>
            }
        ];
    }

    /*对数据进行汇总计算*/
    getComputedData = ()=>{
        const {balanceChangeRecords} = this.props;
        const totalNumber = balanceChangeRecords.length;
        const totalAmount = balanceChangeRecords.reduce((total, record)=> total+=record.amount, 0);
        const intoList = balanceChangeRecords.filter(record=> record.eventType==3);
        const intoNumber = intoList.length;
        const intoAmount = intoList.reduce((total, record)=> total+=record.amount, 0);
        const outList = balanceChangeRecords.filter(record=> record.eventType==4);
        const outNumber = outList.length;
        const outAmount = outList.reduce((total, record)=> total+=record.amount, 0);
        return {
            totalNumber,
            totalAmount,
            intoNumber,
            intoAmount,
            outNumber,
            outAmount
        };
    };

    render() {
        const {balanceChangeRecords, loading} = this.props;
        balanceChangeRecords.map((record, index) => record.id = index);
        const {
            totalNumber,
            totalAmount,
            intoNumber,
            intoAmount,
            outNumber,
            outAmount
        } = this.getComputedData();
        return (
            <Table
                columns={this.columns}
                dataSource={balanceChangeRecords}
                loading={loading}
                rowKey={record => `${record.id}`}
                pagination={false}
                bordered={true}
                title={(currentPageData) =>
                    <div>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.totalNumber} />: {totalNumber}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.totalAmount} />: {totalAmount}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.intoNumber} />: {intoNumber}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.intoAmount} />: {intoAmount}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.outNumber} />: {outNumber}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.outAmount} />: {outAmount}
                        </span>
                    </div>
                }
            />
        );
    }

}

BalanceChangeList.propTypes = balanceChangeListPropTypes;

/*员工表格加载数据蒙层
 * 注意： 表格加载数据的蒙层一定要在表格组件中引入，如果在上层组件引入会造成父组件渲染
 * 导致其他组件重新渲染
 * 如果在父组件中有生成弹窗组件，会导致弹窗组件闪现，出现bug
 * */
function mapStateToProps(state) {
    return {
        loading: state.loading.models.balanceChange
    };
}

export default injectIntl(connect(mapStateToProps)(BalanceChangeList), {
    withRef: true
});