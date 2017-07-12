import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Table} from 'antd';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import {subscriberStatus} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import {dateFormat} from '../../../../../utils/util';
import messages from './messages';
import styles from './index.css';

class SubscriberSelectModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectId: ''
        };
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: formatMessage(messages.serviceCode),
                dataIndex: 'serviceCode',
                key: 'serviceCode',
                width: '30%'
            },
            {
                title: formatMessage(messages.subscriberStatus),
                dataIndex: 'subscriberStatus',
                key: 'subscriberStatus',
                width: '30%',
                render: (text, record, index)=>
                    formatMessage(enumsMessages.subscriberStatus[subscriberStatus[text]])
            },
            {
                title: formatMessage(messages.activateDate),
                dataIndex: 'activateDate',
                width: '24%',
                key: 'activateDate',
                render: (text, record, index)=><span>{dateFormat(new Date(text))}</span>
            },
        ];
    }

    static propTypes = {
        editorVisible: PropTypes.bool.isRequired,
        subscribers: PropTypes.array.isRequired,
        onSubscriberSelect: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        loading: PropTypes.bool,
    };

    modalOptionsGen = ()=>{
        const {editorVisible, onSubscriberSelect, onCancel, intl} = this.props;
        const {formatMessage} = intl;
        const {selectId} = this.state;
        const onOk = ()=>{
            if(selectId!=''){
                onSubscriberSelect(selectId);
            }else {
                Modal.info({
                    title: <FormattedMessage {...messages.infoTitle}/>,
                    content: <FormattedMessage {...messages.infoContent}/>,
                    onOk() {},
                });
            }
        };

        return {
            title: formatMessage(messages.title),
            visible: editorVisible,
            onOk,
            onCancel
        };
    };

    /*员工表格单击选择事件*/
    rowClick = (record, index) => {
        if(record.id!=this.state.selectId){
            this.setState({
                selectId: record.id
            });
        }
    };

    /*员工表格双击选择事件*/
    rowDoubleClick = (record, index) => {
        const {onSubscriberSelect} = this.props;
        onSubscriberSelect(record.id);
    };

    render(){
        const {subscribers, loading} = this.props;
        const {selectId} = this.state;
        const modalOptions = this.modalOptionsGen();
        return (
            <Modal {...modalOptions} wrapClassName='modalStyle-sm'>
                <Table
                    columns={this.columns}
                    dataSource={subscribers}
                    loading={loading}
                    rowKey={record => `${record.id}`}
                    pagination={false}
                    onRowClick={this.rowClick}
                    onRowDoubleClick={this.rowDoubleClick}
                    rowClassName={(record, index)=> record.id==selectId ? 'ant-table-row-select':''}
                    scroll={{ y: 240 }}
                />
            </Modal>
        );
    }
}

function mapStateToPros(state) {
    return {
        loading: state.loading.models.customerService
    };
}

export default injectIntl(connect(mapStateToPros)(SubscriberSelectModal));