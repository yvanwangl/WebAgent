import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Select, TreeSelect, Icon} from 'antd';
import ModalAlert from '../../../Common/ModalAlert/ModalAlert';
import {formItemLayout, formItemHiddenStyle} from '../../../../constants/constants';
import {numberFormat} from '../../../../utils/util';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;

const rechargeModalPropTypes = {
    recharge: PropTypes.object.isRequired
};

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
function RechargeModal({
    intl,
    dispatch,
    form,
    recharge
}) {
    /*充值对象数据解构*/
    const {
        editorType,
        titleType,
        editorVisible,
        organizationStaffTreeNodes,
        rechargeOutType,
        rechargeOutId,
        rechargeOutBalance,
        rechargeInType,
        rechargeInId,
        rechargeInName,
        rechargeInBalance,
        money,
        pin,
        rechargeSuccess,
        rechargeData,
        staffId
    } = recharge;

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;

    /*充值弹窗属性定义*/
    const modalOptions = (() => {
        const onOk = () => {
            form.validateFields((err, values) => {
                if (!!err) {
                    return;
                }
                values['rechargeOutId'] = parseInt(values['rechargeOutId']);
                values['money'] = parseInt(values['money']);
                dispatch({
                    type: 'recharge/recharge',
                    payload: values
                });
            });
        };

        const onCancel = () => {
            dispatch({
                type: 'recharge/hideEditor'
            });
            form.resetFields();
        };

        return {
            title: formatMessage(messages[titleType]),
            visible: editorVisible,
            onOk,
            onCancel
        };
    })();

    /*转出账户选择事件*/
    const onTreeSelectChange = (value) => {
        if(value==undefined){
            form.setFieldsValue({
                rechargeOutBalance: numberFormat(0)
            });
        }else {
            let targetNode = organizationStaffTreeNodes.filter(node => node.key == value)[0];
            form.setFieldsValue({
                rechargeOutType: targetNode.type,
                rechargeOutId: targetNode.id,
                rechargeOutBalance: numberFormat(targetNode.balance)
            });
        }
    };

    /*格式化组织-人员账户树 节点*/
    const treeNodes = (function (organizationStaffTreeNodes) {
        let treeNodes = [];
        /*数据格式化之前进行数据深度拷贝，避免重复渲染导致的引用重复增加*/
        let orgTreeNodes = organizationStaffTreeNodes.map(node => Object.assign({}, node, {children: []}));
        for (let node of orgTreeNodes) {
            node['value'] = `${node.key}`;
            /*如果节点为当前组织，则禁用*/
            if(titleType == 'staff'){
                if (node.type == 1 && node.id == staffId) {
                    node['disabled'] = true;
                }
            }else {
                if (node.type == 0 && node.id == rechargeInId) {
                    node['disabled'] = true;
                }
            }
            /*根节点渲染为：Dealer:*/
            let nodeCode = node.code==null? '':`${node.code} `;
            if(node.parentId==null){
                node['label'] = <span><Icon type="woman"/>{` ${nodeCode}${node.name}`}</span>;
            }else {
                /*节点类型为组织(type=0)，渲染为：Org:*/
                if(node.type==0){
                    node['label'] = <span><Icon type="team"/>{` ${nodeCode}${node.name}`}</span>;
                }else {
                    node['label'] = <span><Icon type="user"/>{` ${nodeCode}${node.name}`}</span>;
                }
            }
            if (node.parentkey == null) {
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
    })(organizationStaffTreeNodes);

    /*
     * 转账金额验证规则：
     * 转账金额应该小于等于转出账户的余额
     * */
    const checkMoney = (rule, value, callback) => {
        if(value==0){
            return callback(formatMessage(messages.moneyMustThanZero));
        }else if (value && +value > +form.getFieldValue('rechargeOutBalance')) {
            return callback(formatMessage(messages.moneyThanOutBalance));
        } else {
            callback();
        }
    };

    /*充值成功提示弹窗属性*/
    const modalAlertProps = {
        type: 'success',
        title: 'This is a notification message',
        content: (
            <div>
                <p>Recharge Success!</p>
            </div>
        ),
        onOk(){
            /*充值成功后对数据进行更新*/
            switch (titleType) {
                case 'organization':
                    dispatch({
                        type: 'dealerOrganization/rechargeSuccess',
                        rechargeData
                    });
                    break;
                case 'staff':
                    dispatch({
                        type: 'organizationStaff/rechargeSuccess',
                        rechargeData
                    });
                    break;
                case 'subDealer':
                    dispatch({
                        type: 'subDealer/rechargeSuccess',
                        rechargeData
                    });
                    break;
            }
            dispatch({
                type: 'recharge/hideRechargeSuccessModal'
            });
            form.resetFields();
        },
    };

    return (
        <div>
            <Modal {...modalOptions} wrapClassName='modalStyle-sm'>
                <Form layout="horizontal">
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('rechargeOutType', {
                                initialValue: rechargeOutType
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('rechargeOutId', {
                                initialValue: rechargeOutId
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.rechargeOutKey)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('rechargeOutKey', {
                                initialValue: ''
                            })(
                                <TreeSelect
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={treeNodes}
                                    placeholder="Please select"
                                    treeDefaultExpandAll
                                    onChange={onTreeSelectChange}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.rechargeOutBalance)} {...formItemLayout}>
                        {
                            getFieldDecorator('rechargeOutBalance', {
                                initialValue: numberFormat(rechargeOutBalance)
                            })(
                                <Input type="text" disabled={true}/>
                            )
                        }
                    </FormItem>
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('rechargeInType', {
                                initialValue: rechargeInType
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('rechargeInId', {
                                initialValue: rechargeInId
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.rechargeInName)} {...formItemLayout}>
                        {
                            getFieldDecorator('rechargeInName', {
                                initialValue: rechargeInName
                            })(
                                <Input type="text" disabled={true}/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.rechargeInBalance)} {...formItemLayout}>
                        {
                            getFieldDecorator('rechargeInBalance', {
                                initialValue: numberFormat(rechargeInBalance)
                            })(
                                <Input type="text" disabled={true}/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.money)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('money', {
                                initialValue: money,
                                validateFirst: true,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.moneyRule)
                                    },
                                    {
                                        validator: checkMoney
                                    }
                                ]
                            })(
                                <Input type="number"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.pin)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('pin', {
                                initialValue: pin,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.pinRule)
                                    }
                                ]
                            })(
                                <Input type="password"/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
            {
                rechargeSuccess && <ModalAlert {...modalAlertProps} />
            }
        </div>

    );
}

RechargeModal.propTypes = rechargeModalPropTypes;

function mapStateToProps({recharge}) {
    return {recharge};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(RechargeModal)));