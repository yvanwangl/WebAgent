import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {dateFormat, numberFormat} from '../../../../../utils/util';
import {Table} from 'antd';
import messages from './messages';
import styles from './index.css';

const activationSubscriberListPropTypes = {
    activationSubscribers: PropTypes.array.isRequired,
    loading: PropTypes.bool
};
class ActivationSubscriberList extends Component {

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
                title: formatMessage(messages.smartCardCode),
                dataIndex: 'smartCardCode',
                key: 'smartCardCode'
            },
            {
                title: formatMessage(messages.stbCode),
                dataIndex: 'stbCode',
                key: 'stbCode'
            },
            {
                title:formatMessage(messages.customerName),
                dataIndex: 'customerName',
                key: 'customerName'
            },
            {
                title: formatMessage(messages.mobile),
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: formatMessage(messages.bouquet),
                dataIndex: 'bouquet',
                key: 'bouquet'
            },
            {
                title: formatMessage(messages.createCode),
                dataIndex: 'createCode',
                key: 'createCode',
                render: (text, record, index)=> <span>{`${text} ${record.partnerStaffName}`}</span>
            }
        ];
    }

    render() {
        const {activationSubscribers, loading} = this.props;
        activationSubscribers.map((subscriber, index)=> subscriber.id=index);
        return (
            <Table
                columns={this.columns}
                dataSource={activationSubscribers}
                loading={loading}
                rowKey={record => `${record.id}`}
                pagination={false}
                bordered={true}
                title={(currentPageData)=>
                    <span>
                        <FormattedMessage {...messages.totalNumber} />: {currentPageData.length}
                    </span>
                }
            />
        );
    }

}

ActivationSubscriberList.propTypes = activationSubscriberListPropTypes;

/*员工表格加载数据蒙层
* 注意： 表格加载数据的蒙层一定要在表格组件中引入，如果在上层组件引入会造成父组件渲染
* 导致其他组件重新渲染
* 如果在父组件中有生成弹窗组件，会导致弹窗组件闪现，出现bug
* */
function mapStateToProps(state) {
    return {
        loading: state.loading.models.activationSubscriber
    };
}

export default injectIntl(connect(mapStateToProps)(ActivationSubscriberList), {
    withRef: true
});