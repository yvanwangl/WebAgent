import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Modal, Select, Cascader} from 'antd';
import messages from './messages';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import {formItemHiddenStyle, formItemLayout} from '../../../../../constants/constants';
import styles from './index.css';

const FormItem = Form.Item;

const customerModalPropTypes = {
    customerServiceCustomer: PropTypes.object.isRequired,
};

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
function CustomerModal({
    intl,
    form,
    dispatch,
    customerServiceCustomer
}) {
    const {
        editorVisible,
        saleAddressId,
        saleAddressName,
        addresses,
        currentItem,
        modifyCustomerSuccess
    } = customerServiceCustomer;

    const {
        id,
        version,
        firstName,
        lastName,
        mobile,
        email,
        addressId,
        detailAddress
    } = currentItem;

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;

    /*生成地址树*/
    const addressList = ((addresses, saleAddressId) => {
        const treeNodes = [];
        const addressList = addresses.map(address => Object.assign({}, address, {children: []}));
        for (let address of addressList) {
            address['key'] = `${address.id}`;
            address['value'] = `${address.id}`;
            address['label'] = address.name;
            if (address.parentId == saleAddressId) {
                treeNodes.push(address);
            } else {
                for (let item of addressList) {
                    if (address.parentId == item.id) {
                        item.children.push(address);
                    }
                }
            }
        }
        return treeNodes;
    })(addresses, saleAddressId);

    /*换包编辑弹窗属性定义*/
    const modalOptions = (() => {
        const onOk = () => {
            form.validateFields((err, values) => {
                if (!!err) {
                    return;
                }
                values['addressId'] = +values['addressId'][values['addressId'].length-1];
                dispatch({
                    type: 'customerServiceCustomer/doModifyCustomer',
                    payload: values
                });
            });
        };

        const onCancel = () => {
            dispatch({
                type: 'customerServiceCustomer/hideModal',
            });
            form.resetFields();
        };

        return {
            title: formatMessage(messages.title),
            visible: editorVisible,
            onOk,
            onCancel
        };
    })();

    /*更换包成功提示弹窗属性*/
    const modalAlertProps = {
        type: 'success',
        title: <FormattedMessage {...messages.successTitle}/>,
        content: <FormattedMessage {...messages.successContent}/>,
        onOk(){
            dispatch({
                type: 'customerServiceCustomer/hideModifyCustomerSuccessModal'
            });
            form.resetFields();
            /*
             * 点击成功确认弹窗的确定按钮后，通知 customerService 更新 customerInfo 的信息
             * */
            dispatch({
                type: 'customerService/updateCustomerInfo',
                customerInfo: currentItem
            });
        },
    };


    /*
     * 校验地址是否必填
     * 如果销售区域为空则地址可为空，如果销售区域不为空地址必填
     * */
    const checkAddressId = (rule, value, callback) => {
        if (saleAddressName != null && saleAddressName != '' && value == null) {
            callback('dizhi bueng weikong ');
        } else {
            callback();
        }
    };

    /*迭代将当前地址的所有父地址标识都转 string 然后放到集合中*/
    const initialAddress = ((addresses, addressId)=>{
        const initiallList = [`${addressId}`];
        const currentAddress = addresses.filter(address=> address.id==addressId)[0];
        function findParentAddress(currentAddress) {
            for(let address of addresses) {
                if(address.id == currentAddress.parentId){
                    initiallList.unshift(`${address.id}`);
                    if(address.parentId != null){
                        findParentAddress(address);
                    }
                }
            }
        }
        if(currentAddress){
            findParentAddress(currentAddress);
        }
        return initiallList;
    })(addresses, addressId);

    return (
        <div>
            <Modal {...modalOptions} wrapClassName='modalStyle-sm'>
                <Form layout='horizontal'>
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('id', {
                                initialValue: id
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem style={formItemHiddenStyle}>
                        {
                            getFieldDecorator('version', {
                                initialValue: version
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.firstName)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('firstName', {
                                initialValue: firstName,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.firstNameRule)
                                    }
                                ]
                            })(
                                <Input type="text"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.lastName)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('lastName', {
                                initialValue: lastName,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.lastNameRule)
                                    }
                                ]
                            })(
                                <Input type="text"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.mobile)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('mobile', {
                                initialValue: mobile,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.mobileRule)
                                    }
                                ]
                            })(
                                <Input type="text"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.email)} hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('email', {
                                initialValue: email,
                                rules: [
                                    {
                                        type: 'email',
                                        message: formatMessage(messages.emailRule)
                                    }
                                ]
                            })(
                                <Input type="text"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.address)} {...formItemLayout}>
                        <div>
                            <div className={styles.addressContainer}>
                                <FormItem style={{width: '49%'}}>
                                    {
                                        getFieldDecorator('saleAddressName', {
                                            initialValue: saleAddressName
                                        })(
                                            <Input type="text" disabled={true}/>
                                        )
                                    }
                                </FormItem>
                                <FormItem style={{width: '49%'}}>
                                    {
                                        getFieldDecorator('addressId', {
                                            initialValue: initialAddress,
                                            rules: [
                                                {
                                                    validator: checkAddressId
                                                }
                                            ]
                                        })(
                                            <Cascader
                                                options={addressList}
                                                expandTrigger="click"
                                                changeOnSelect={true}
                                                placeholder="Please select"
                                            />
                                        )
                                    }
                                </FormItem>
                            </div>
                            <FormItem style={{width: '100%', marginTop: 10}}>
                                {
                                    getFieldDecorator('detailAddress', {
                                        initialValue: detailAddress
                                    })(
                                        <Input type='text'/>
                                    )
                                }
                            </FormItem>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
            {
                modifyCustomerSuccess && <ModalAlert {...modalAlertProps}/>
            }
        </div>
    );
}

CustomerModal.propTypes = customerModalPropTypes;

function mapStateToProps({customerServiceCustomer}) {
    return {customerServiceCustomer};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(CustomerModal)));