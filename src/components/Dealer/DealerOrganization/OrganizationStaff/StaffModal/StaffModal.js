import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Select} from 'antd';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import {accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

const staffModalPropTypes = {
    editorType: PropTypes.string.isRequired,
    editorVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    telConfig: PropTypes.object.isRequired,
};

function StaffModal({
    intl,
    form,
    editorType,
    telConfig,
    editorVisible,
    onConfirm,
    onCancel,
    currentItem,
    organizationId: oId,
    organizationName: oName
}) {

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;
    /*员工编辑弹窗属性定义*/
    const modalOptions = (()=>{
        const onOk = ()=>{
            form.validateFields((err, values)=>{
                if(!!err){
                    return;
                }
                onConfirm(values);
            });
        };

        return {
            title:editorType=='create'?formatMessage(messages.create):formatMessage(messages.modify),
            visible: editorVisible,
            onOk,
            onCancel
        };
    })();

    const checkMobilePhone = (rule, value, callback)=>{
        const telFormat = telConfig.customer_tel_format;
        if(telFormat!=null && !(new RegExp(telFormat).test(value))){
            return callback(formatMessage(messages.mobileNumberRule));
        }
        callback();
    };

    /*根据弹窗类型，对id，organizationId，organizationName，code 进行动态数据填充处理*/
    const editItem = editorType=='create'?{}:currentItem;
    let {name, mobilePhone, usedAccountType, mem, version=0} = editItem;
    const id = editorType=='create'? -1:currentItem.id;
    const partnerOrganizationId = editorType=='create'?oId:currentItem.partnerOrganizationId;
    const partnerOrganizationName = editorType=='create'?oName:currentItem.partnerOrganizationName;
    const code =  editorType=='create'?formatMessage(messages.codeMessage):currentItem.code;
    return (
        <Modal {...modalOptions} wrapClassName='modalStyle-sm'>
            <Form layout="horizontal">
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
                <FormItem style={formItemHiddenStyle}>
                    {
                        getFieldDecorator('partnerOrganizationId', {
                            initialValue: partnerOrganizationId
                        })(
                            <Input type="hidden"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.partnerOrganizationName)} {...formItemLayout}>
                    {
                        getFieldDecorator('partnerOrganizationName', {
                            initialValue: partnerOrganizationName
                        })(
                            <Input type="text" disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.code)} {...formItemLayout}>
                    {
                        getFieldDecorator('code', {
                            initialValue: code
                        })(
                            <Input type="text" disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.name)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules:[
                                {
                                    required: true,
                                    message: formatMessage(messages.nameRule)
                                }
                            ]
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.mobilePhone)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('mobilePhone', {
                            initialValue: mobilePhone,
                            rules:[
                                {
                                    required: true,
                                    message: formatMessage(messages.mobilePhoneRequired)
                                },
                                {
                                    min: parseInt(telConfig.customer_tel_length),
                                    message: formatMessage(messages.mobilePhoneMinLen)+' '+telConfig.customer_tel_length
                                },
                                {
                                    validator: checkMobilePhone
                                }
                            ]
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.usedAccountType)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('usedAccountType', {
                            initialValue: usedAccountType,
                            rules:[
                                {
                                    required: true,
                                    message: formatMessage(messages.usedAccountTypeRule)
                                }
                            ]
                        })(
                            <Select>
                                {
                                    accountType.map((account, index)=>
                                        <Option key={index} value={index}>
                                            <FormattedMessage {...enumsMessages.accountType[account]}/>
                                        </Option>
                                    )
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.mem)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('mem', {
                            initialValue: mem
                        })(
                            <Input type="textarea" rows={4} />
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    );
}

StaffModal.propTypes = staffModalPropTypes;

export default injectIntl(Form.create()(StaffModal));