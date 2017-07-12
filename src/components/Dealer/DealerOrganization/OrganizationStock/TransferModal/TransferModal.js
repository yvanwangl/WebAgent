import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Table, Input, TreeSelect} from 'antd';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import classNames from 'classnames/bind';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const cx = classNames.bind(styles);

class TransferModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            selectId: null
        };
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: formatMessage(messages.resourceSpecClassName),
                dataIndex: 'resourceSpecClassName',
                key: 'resourceSpecClassName',
                width: '24%'
            },
            {
                title: formatMessage(messages.resourceNumber),
                dataIndex: 'sourceResourceNumber',
                key: 'sourceResourceNumber',
                width: '24%'
            },
            {
                title: formatMessage(messages.targetResourceNumber),
                dataIndex: 'resourceNumber',
                key: 'resourceNumber',
                width: '24%'
            },
            {
                title: formatMessage(messages.changeNumber),
                dataIndex: 'changeNumber',
                key: 'changeNumber',
                width: '18%',
                render: (text, record, index) =>
                    <Input
                        className={cx({errorChangeNumber: text > record['resourceNumber']})}
                        value={text}
                        type='number'
                        onChange={this.editCellHandler(index, 'changeNumber')}
                    />
            },
        ];
    }

    static propTypes = {
        transferOrganizationStock: PropTypes.object.isRequired,
        organizationId: PropTypes.any,
        organizationName: PropTypes.string,
        loading: PropTypes.bool,
    };

    /*默认选中根组织节点*/
    componentWillReceiveProps(nextProps){
        const {transferOrganizationStock} = nextProps;
        const {stockList, organizationTreeNodes} = transferOrganizationStock;
        this.setState({
            stocks: stockList
        });
        if(this.state.selectId==null){
            this.setState({
                selectId: organizationTreeNodes.length>0 ? organizationTreeNodes[0].id:null
            }, ()=> {
                if(this.state.selectId!=null){
                    this.onTreeSelectChange(this.state.selectId);
                }
            });
        }
    }

    /*现有库存数量编辑事件*/
    editCellHandler = (index, key) => {
        return (e) => {
            const stockList = [...this.state.stocks];
            const record = stockList[index];
            if(e.target.value==null){
                record[key] = e.target.value;
            }else {
                if(e.target.value > record.sourceResourceNumber){
                    record[key] = record.sourceResourceNumber;
                }else {
                    record[key] = parseInt(e.target.value);
                }
            }
            this.setState({
                stocks: stockList
            });
        };
    };

    /*仓库调拨弹窗属性*/
    modalOptionsGen = () => {
        const {dispatch, intl, form, transferOrganizationStock} = this.props;
        const {editorVisible} = transferOrganizationStock;
        const {formatMessage} = intl;
        const {stocks} = this.state;
        const resetState = ()=> {
            this.setState({
                stocks: [],
                selectId: null
            });
        };
        const onOk = () => {
            //获取表单的值
            const formValues = form.getFieldsValue();
            stocks.map(stock=> {
                if(Number.isNaN(stock.changeNumber)){
                    stock.changeNumber=0
                }
            });
            dispatch({
                type: 'transferOrganizationStock/transferStock',
                payload: {
                    ...formValues,
                    stocks
                }
            });
            resetState();
        };
        const onCancel = () => {
            dispatch({
                type: 'transferOrganizationStock/hideEditor'
            });
            resetState();
            form.resetFields();
        };
        return {
            title: formatMessage(messages.title),
            visible: editorVisible,
            onOk,
            onCancel
        };
    };

    treeNodesGen = (organizationTreeNodes) => {
        /*数据格式化之前进行数据深度拷贝，避免重复渲染导致的引用重复增加*/
        organizationTreeNodes.map(node=> {
            node['value'] = `${node.id}`;
            node['label'] = `${node.name}`;
            if(node.children.length>0){
                this.treeNodesGen(node.children);
            }
        });
        return organizationTreeNodes;
    };

    /*格式化组织树 节点*/
    /*treeNodesGen = (organizationTreeNodes) => {
        let treeNodes = [];
        /!*数据格式化之前进行数据深度拷贝，避免重复渲染导致的引用重复增加*!/
        let orgTreeNodes = organizationTreeNodes.map(node => Object.assign({}, node, {children: []}));
        for (let node of orgTreeNodes) {
            node['value'] = `${node.key}`;
            /!*根节点渲染为：Dealer:*!/
            let nodeCode = node.code==null? '':`${node.code} `;
            if(node.parentId==null){
                node['label'] = `Dealer: ${nodeCode}${node.name}`;
            }else {
                /!*其他下级组织，渲染为：Org:*!/
                node['label'] = `Org: ${nodeCode}${node.name}`;
            }
            if (node.parentkey == null || node.parentkey == undefined) {
                treeNodes.push(node);
            } else {
                for (let n of orgTreeNodes) {
                    if (node.parentkey == n.key) {
                        n.children.push(node);
                    }
                }
            }
        }
        return treeNodes;
    };*/

    /*组织树节点选中事件*/
    onTreeSelectChange = (value) => {
        const {dispatch} = this.props;
        if(value==undefined){
            dispatch({
                type: 'transferOrganizationStock/resetStockList'
            })
        }else {
            dispatch({
                type: 'transferOrganizationStock/organizationTreeSelect',
                payload: {
                    selectOrganizationId: value
                }
            });
        }
    };

    /*仓库调拨成功提示信息*/
    transferStockModalAlertPropsGen = () => {
        const {dispatch, form, organizationId} = this.props;
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
                    type: 'transferOrganizationStock/hideTransferSuccessModal'
                });
                form.resetFields();
            },
        };
    };

    render() {
        const {
            loading,
            form,
            intl,
            organizationId,
            organizationName,
            transferOrganizationStock
        } = this.props;
        const {stockList, organizationTreeNodes, transferStockSuccess} = transferOrganizationStock;
        const {getFieldDecorator} = form;
        const {formatMessage} = intl;
        const modalOptions = this.modalOptionsGen();
        const treeNodes = this.treeNodesGen(organizationTreeNodes);
        const transferStockModalAlertProps = this.transferStockModalAlertPropsGen();
        return (
            <div>
                <Modal {...modalOptions} wrapClassName='modalStyle-lg'>
                    <Form layout="inline" style={{marginBottom:15}}>
                        <FormItem label={formatMessage(messages.sourceOrganization)} {...formItemLayout}
                                  style={{width: '46%'}}>
                            {
                                getFieldDecorator('sourceOrganizationId', {
                                    initialValue: treeNodes.length>0? `${treeNodes[0].id}`:''
                                })(
                                    <TreeSelect
                                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                        treeData={treeNodes}
                                        placeholder="Please select"
                                        treeDefaultExpandAll
                                        onChange={this.onTreeSelectChange}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem style={formItemHiddenStyle}>
                            {
                                getFieldDecorator('destinationOrganizationId', {
                                    initialValue: organizationId
                                })(
                                    <Input type="hidden"/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.organizationName)} {...formItemLayout}
                                  style={{width: '46%'}}>
                            {
                                getFieldDecorator('organizationName', {
                                    initialValue: organizationName
                                })(
                                    <Input type="text" disabled={true}/>
                                )
                            }
                        </FormItem>
                    </Form>
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
                    transferStockSuccess && <ModalAlert {...transferStockModalAlertProps} />
                }
            </div>
        );
    }
}

function mapStateToPros(state) {
    return {
        transferOrganizationStock: state.transferOrganizationStock,
        loading: state.loading.models.transferOrganizationStock
    };
}

export default injectIntl(connect(mapStateToPros)(Form.create()(TransferModal)));