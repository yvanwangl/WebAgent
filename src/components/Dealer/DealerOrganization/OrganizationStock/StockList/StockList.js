import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {numberFormat} from '../../../../../utils/util';
import {Table} from 'antd';
import messages from './messages';
import styles from './index.css';

const stockListPropTypes = {
    stockList: PropTypes.array.isRequired,
    loading: PropTypes.bool
};
class StockList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: null,
            selectId: null
        };
        /*仓库表格列定义*/
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                title: '',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: formatMessage(messages.resourceSpecClassName),
                dataIndex: 'resourceSpecClassName',
                key: 'resourceSpecClassName',
                width: '30%'
            },
            {
                title: formatMessage(messages.resourceNumber),
                dataIndex: 'resourceNumber',
                key: 'resourceNumber',
                width: '30%'
            },
            {
                title: formatMessage(messages.totalResourceNumber),
                dataIndex: 'totalResourceNumber',
                key: 'totalResourceNumber',
                width: '30%'
            },
        ];
    }

    render() {
        const {stockList, loading} = this.props;
        return (
            <Table
                columns={this.columns}
                dataSource={stockList}
                loading={loading}
                rowKey={record => `${record.id}`}
                pagination={false}
            />
        );
    }

}

StockList.propTypes = stockListPropTypes;

/*员工表格加载数据蒙层
* 注意： 表格加载数据的蒙层一定要在表格组件中引入，如果在上层组件引入会造成父组件渲染
* 导致其他组件重新渲染
* 如果在父组件中有生成弹窗组件，会导致弹窗组件闪现，出现bug
* */
function mapStateToProps(state) {
    return {
        loading: state.loading.models.organizationStock
    };
}

export default injectIntl(connect(mapStateToProps)(StockList));