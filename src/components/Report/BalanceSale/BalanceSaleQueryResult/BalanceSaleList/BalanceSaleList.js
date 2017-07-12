import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {dateFormat,numberFormat} from '../../../../../utils/util';
import {partnerBalanceSalesType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import {Table} from 'antd';
import messages from './messages';
import styles from './index.css';

const balanceSaleListPropTypes = {
    balanceSaleRecords: PropTypes.array.isRequired,
    loading: PropTypes.bool
};
class BalanceSaleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: null,
            selectId: null
        };
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                title: formatMessage(messages.createInstant),
                dataIndex: 'createInstant',
                key: 'createInstant',
                width: '10%',
                render: (text, record, index) => dateFormat(new Date(text))
            },
            {
                title: formatMessage(messages.money),
                dataIndex: 'money',
                key: 'money',
                width: '10%',
                className: 'columnMoney',
                render: (text, record, index) => numberFormat(text)
            },
            {
                title: formatMessage(messages.cardValue),
                dataIndex: 'cardValue',
                key: 'cardValue',
                width: '14%',
                className: 'columnMoney',
                render: (text, record, index) => numberFormat(text)
            },
            {
                title: formatMessage(messages.number),
                dataIndex: 'number',
                key: 'number',
                width: '12%',
                render: (text, record, index) => text == null ? 0 : text
            },
            {
                title: formatMessage(messages.mobile),
                dataIndex: 'mobile',
                key: 'mobile',
                width: '10%',
            },
            {
                title: formatMessage(messages.smartCard),
                dataIndex: 'smartCard',
                key: 'smartCard',
                width: '14%',
            },
            {
                title: formatMessage(messages.type),
                dataIndex: 'type',
                key: 'type',
                width: '12%',
                render: (text, record, index) =>
                    <FormattedMessage {...enumsMessages.partnerBalanceSalesType[partnerBalanceSalesType[text]]}/>
            },
            {
                title: formatMessage(messages.createCode),
                dataIndex: 'createCode',
                key: 'createCode',
                width: '10%',
                render: (text, record, index) => <span>{`${text} ${record.partnerStaffName}`}</span>
            }
        ];
    }


    rowSelection = (record, index) => {
        const {onRecordSelect} = this.props;
        if (record.id != this.state.selectId) {
            this.setState({
                selectIndex: index,
                selectId: record.id
            });
            onRecordSelect(record);
        }
    };

    /*对数据进行汇总计算*/
    getComputedData = () => {
        const {balanceSaleRecords} = this.props;
        const totalNumber = balanceSaleRecords.length;
        const totalAmount = balanceSaleRecords.reduce((total, record) => total += record.money, 0);
        /*直冲：2*/
        const remoteTopUpList = balanceSaleRecords.filter(record => record.type == 2);
        const remoteTopUpNumber = remoteTopUpList.length;
        const remoteTopUpAmount = remoteTopUpList.reduce((total, record) => total += record.money, 0);
        /*电子卡销售：1*/
        const voucherCardList = balanceSaleRecords.filter(record => record.type == 1);
        const voucherCardNumber = voucherCardList.length;
        const voucherCardAmount = voucherCardList.reduce((total, record) => total += record.money, 0);
        return {
            totalNumber,
            totalAmount,
            remoteTopUpNumber,
            remoteTopUpAmount,
            voucherCardNumber,
            voucherCardAmount
        };
    };

    render() {
        const {balanceSaleRecords, loading} = this.props;
        balanceSaleRecords.map((record, index)=> record.id=index);
        const {
            totalNumber,
            totalAmount,
            remoteTopUpNumber,
            remoteTopUpAmount,
            voucherCardNumber,
            voucherCardAmount
        } = this.getComputedData();
        return (
            <Table
                columns={this.columns}
                dataSource={balanceSaleRecords}
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
                            <FormattedMessage {...messages.remoteTopUpNumber} />: {remoteTopUpNumber}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.remoteTopUpAmount} />: {remoteTopUpAmount}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.voucherCardNumber} />: {voucherCardNumber}
                        </span>
                        <span className={styles.computedDataItem}>
                            <FormattedMessage {...messages.voucherCardAmount} />: {voucherCardAmount}
                        </span>
                    </div>
                }
            />
        );
    }

}

BalanceSaleList.propTypes = balanceSaleListPropTypes;

/*员工表格加载数据蒙层
 * 注意： 表格加载数据的蒙层一定要在表格组件中引入，如果在上层组件引入会造成父组件渲染
 * 导致其他组件重新渲染
 * 如果在父组件中有生成弹窗组件，会导致弹窗组件闪现，出现bug
 * */
function mapStateToProps(state) {
    return {
        loading: state.loading.models.balanceSale
    };
}

export default injectIntl(connect(mapStateToProps)(BalanceSaleList), {
    withRef: true
});
