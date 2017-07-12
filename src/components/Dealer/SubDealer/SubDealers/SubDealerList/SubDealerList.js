import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {staffType, accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import {numberFormat} from '../../../../../utils/util';
import {Table} from 'antd';
import messages from './messages';
import styles from './index.css';

class SubDealerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: null,
            selectId: null
        };
        const {intl: {formatMessage}} = this.props;
        /*下级代理商表格列定义*/
        this.columns = [
            {
                title: '',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: formatMessage(messages.partnerCode),
                dataIndex: 'partnerCode',
                key: 'partnerCode'
            },
            {
                title: formatMessage(messages.partnerName),
                dataIndex: 'partnerName',
                key: 'partnerName'
            },
            {
                title: formatMessage(messages.partnerSaleAddressName),
                dataIndex: 'partnerSaleAddressName',
                key: 'partnerSaleAddressName'
            },
            {
                title:formatMessage(messages.balance),
                dataIndex: 'balance',
                key: 'balance',
                className: 'columnMoney',
                render: (text, record, index)=> <span>{numberFormat(text)}</span>
            },
            {
                title: formatMessage(messages.linkman),
                dataIndex: 'linkman',
                key: 'linkman'
            },
            {
                title: formatMessage(messages.mobile),
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: formatMessage(messages.address),
                dataIndex: 'address',
                key: 'address'
            }
        ];
    }

    static propTypes = {
        currentPartner: PropTypes.object.isRequired,
        subDealers: PropTypes.array.isRequired,
        loading: PropTypes.bool,
        onSubDealerSelect: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const {currentPartner, onSubDealerSelect} = nextProps;
        if (this.state.selectId != currentPartner.partnerId) {
            this.setState({
                selectId: currentPartner.partnerId
            }, ()=>onSubDealerSelect(currentPartner));
        }
    }

    /*下级代理商表格选择事件*/
    rowSelection = (record, index) => {
        const {onSubDealerSelect} = this.props;
        if(record.partnerId!=this.state.selectId){
            this.setState({
                selectIndex: index,
                selectId: record.partnerId
            });
            onSubDealerSelect(record);
        }
    };

    render() {
        const {subDealers, loading} = this.props;
        const {selectId} = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={subDealers}
                loading={loading}
                rowKey={record => `${record.partnerId}`}
                pagination={false}
                onRowClick={this.rowSelection}
                rowClassName={(record, index)=> record.partnerId==selectId ? 'ant-table-row-select':''}
            />
        );
    }

}

/*员工表格加载数据蒙层
* 注意： 表格加载数据的蒙层一定要在表格组件中引入，如果在上层组件引入会造成父组件渲染
* 导致其他组件重新渲染
* 如果在父组件中有生成弹窗组件，会导致弹窗组件闪现，出现bug
* */
function mapStateToProps(state) {
    return {
        loading: state.loading.models.organizationStaff
    };
}

export default injectIntl(connect(mapStateToProps)(SubDealerList), {
    withRef: true
});