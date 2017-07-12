import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Table, Input} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import messages from './messages';
import styles from './index.css';

class StockModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            stocks: []
        };
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index)=> <span>{index+1}</span>
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
                width: '20%'
            },
            {
                title: formatMessage(messages.currentResourceNumber),
                dataIndex: 'currentResourceNumber',
                key: 'currentResourceNumber',
                width: '20%',
                render: (text, record, index)=>
                    <Input
                        value={text}
                        type='number'
                        onChange={this.editCellHandler(index, 'currentResourceNumber')}
                    />
            },
            {
                title: formatMessage(messages.changeNumber),
                dataIndex: 'changeNumber',
                key: 'changeNumber',
                width: '20%'
            },
        ];
    }

    static propTypes = {
        modifyOrganizationStock: PropTypes.object.isRequired,
        organizationId: PropTypes.any,
        organizationName: PropTypes.string,
        loading: PropTypes.bool,
    };

    componentWillReceiveProps(nextProps){
        const {modifyOrganizationStock} = nextProps;
        const {stockList} = modifyOrganizationStock;
        this.setState({
            stocks: stockList
        });
    }

    /*修改仓库编辑弹窗属性*/
    modalOptionsGen = ()=>{
        const {dispatch, intl, modifyOrganizationStock, organizationId} = this.props;
        const {editorVisible} = modifyOrganizationStock;
        const {formatMessage} = intl;
        const {stocks} = this.state;
        const resetState = ()=>{
            this.setState({
                stocks: []
            });
        };
        const onOk = ()=>{
            dispatch({
                type:'modifyOrganizationStock/modifyStock',
                payload: {
                    organizationId,
                    stocks
                }
            });
        };
        const onCancel = ()=>{
            dispatch({
                type:'modifyOrganizationStock/hideEditor'
            });
            resetState();
        };
        return {
            title: formatMessage(messages.title),
            visible: editorVisible,
            onOk,
            onCancel
        };
    };

    /*现有库存数量编辑事件*/
    editCellHandler = (index, key)=>{
        return (e)=>{
            const stockList = [...this.state.stocks];
            const record = stockList[index];
            if(e.target.value==''){
                record[key] = e.target.value;
                record['changeNumber'] = 0;
            }else {
                record[key] = parseInt(e.target.value);
                /*调整数量 = 现有库存量-原库存量*/
                record['changeNumber'] = record['currentResourceNumber']-record['resourceNumber'];
            }
            this.setState({
                stocks: stockList
            });
        };
    };

    /*仓库修改成功提示信息*/
    modifyStockModalAlertPropsGen = ()=> {
        const {dispatch, organizationId} = this.props;
        const resetState = ()=>{
            this.setState({
                stocks: []
            });
        };
        return {
            type: 'success',
            title: <FormattedMessage {...messages.successTitle}/>,
            content: <FormattedMessage {...messages.successContent}/>,
            onOk(){
                dispatch({
                    type:'organizationStock/nodeSelect',
                    payload: {
                        selectKey: organizationId
                    }
                });
                dispatch({
                    type: 'modifyOrganizationStock/hideModifySuccessModal'
                });
                resetState();
            },
        }
    };

    render(){
        const {modifyOrganizationStock, organizationName, loading} = this.props;
        const {stockList, modifyStockSuccess} = modifyOrganizationStock;
        const modalOptions = this.modalOptionsGen();
        const modifyStockModalAlertProps = this.modifyStockModalAlertPropsGen();
        return (
            <div>
                <Modal {...modalOptions} wrapClassName='modalStyle-lg'>
                    <h2 className={styles.currentOrganization}><FormattedMessage {...messages.currentOrganization}/>: {organizationName}</h2>
                    <Table
                        columns={this.columns}
                        dataSource={stockList}
                        loading={loading}
                        rowKey={record => `${record.id}`}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Modal>
                {
                    modifyStockSuccess && <ModalAlert {...modifyStockModalAlertProps} />
                }
            </div>

        );
    }
}

function mapStateToPros(state) {
    return {
        modifyOrganizationStock: state.modifyOrganizationStock,
        loading: state.loading.models.modifyOrganizationStock
    };
}

export default injectIntl(connect(mapStateToPros)(StockModal));