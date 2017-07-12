import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {staffType, accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import {numberFormat} from '../../../../../utils/util';
import {Table, Icon} from 'antd';
import messages from './messages';
import styles from './index.css';

const staffListPropTypes = {
    staffList: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRecordSelect: PropTypes.func.isRequired,
    organizationChange: PropTypes.bool.isRequired,
    resetOrganizationChange: PropTypes.func
};
class StaffList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: null,
            selectId: null
        };
        const {intl: {formatMessage}} = this.props;
        /*员工表格列定义*/
        this.columns = [
            {
                title: '',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: formatMessage(messages.code),
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: formatMessage(messages.name),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: formatMessage(messages.type),
                dataIndex: 'type',
                key: 'type',
                render: (text, record, index)=>
                    <FormattedMessage {...enumsMessages.staffType[staffType[text]]}/>
            },
            {
                title: formatMessage(messages.mobilePhone),
                dataIndex: 'mobilePhone',
                key: 'mobilePhone'
            },
            /*{
                title: formatMessage(messages.usedAccountType),
                dataIndex: 'usedAccountType',
                key: 'usedAccountType',
                render: (text, record, index) =>
                    <FormattedMessage {...enumsMessages.accountType[accountType[text]]}/>
            },*/
            {
                title: formatMessage(messages.usedAccount),
                dataIndex: 'usedAccount',
                key: 'usedAccount',
                render: (text, record, index) => {
                    /*
                    * usedAccountType: 0: 自身账户
                    * usedAccountType: 1: 所属组织账户
                    * usedAccountType: 2: 根组织账户
                    * */
                    let accountType = '';
                    let usedAccountCode = record['usedAccountCode']==null? '': ` ${record['usedAccountCode']}`;
                    let usedAccountName = ` ${record['usedAccountName']}`;
                    switch (record['usedAccountType']){
                        case 0:
                            accountType='user';
                            break;
                        case 1:
                            accountType='team';
                            break;
                        case 2:
                            accountType='woman';
                            break;
                    }
                    return <div><Icon type={accountType}/><span>{` ${usedAccountCode}${usedAccountName}`}</span></div>
                }
            },
            {
                title: formatMessage(messages.balance),
                dataIndex: 'balance',
                key: 'balance',
                className: 'columnMoney',
                render: (text, record, index)=> <span>{numberFormat(text)}</span>
            }
        ];
    }

    /*员工表格选择事件*/
    rowSelection = (record, index) => {
        const {onRecordSelect} = this.props;
        if(record.id!=this.state.selectId){
            this.setState({
                selectIndex: index,
                selectId: record.id
            });
            onRecordSelect(record);
        }
    };

    componentWillReceiveProps(nextProps){
        const {organizationChange, resetOrganizationChange} = nextProps;
        if(organizationChange){
            this.setState({
                selectIndex: null,
                selectId: null
            });
            resetOrganizationChange();
        }
    }

    render() {
        const {staffList, loading} = this.props;
        const {selectIndex} = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={staffList}
                loading={loading}
                rowKey={record => `${record.id}`}
                pagination={false}
                onRowClick={this.rowSelection}
                ref="staffTable"
                rowClassName={(record, index)=> index==selectIndex ? 'ant-table-row-select':''}
            />
        );
    }

}

StaffList.propTypes = staffListPropTypes;

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

export default injectIntl(connect(mapStateToProps)(StaffList), {
    withRef: true
});