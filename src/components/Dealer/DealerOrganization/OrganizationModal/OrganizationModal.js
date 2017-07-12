import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input} from 'antd';
import {formItemLayout, formItemHiddenStyle} from '../../../../constants/constants';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;

const organizationModalPropTypes = {
    editorType: PropTypes.string.isRequired,
    editorVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
};

function OrganizationModal({
    intl,
    form,
    editorType,
    editorVisible,
    onConfirm,
    onCancel,
    currentItem
}) {

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;

    /*组织编辑弹窗属性定义*/
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

    /*根据弹窗类型，对id，parentId，parentName 进行动态数据填充处理*/
    const editItem = editorType=='create'?{}:currentItem;
    let {name, code, remark, version=0} = editItem;
    const id = editorType=='create'? -1:currentItem.id;
    const parentId = editorType=='create'?currentItem.id:currentItem.parentId;
    const parentName = editorType=='create'?currentItem.name:currentItem.parentName;
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
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Input type="hidden"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.parentName)} {...formItemLayout}>
                    {
                        getFieldDecorator('parentName', {
                            initialValue: parentName
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
                <FormItem label={formatMessage(messages.code)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('code', {
                            initialValue: code
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.remark)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('remark', {
                            initialValue: remark
                        })(
                            <Input type="textarea" rows={4} />
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    );
}

OrganizationModal.propTypes = organizationModalPropTypes;

export default injectIntl(Form.create()(OrganizationModal));