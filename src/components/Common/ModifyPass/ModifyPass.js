import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Form, Input, Modal} from 'antd';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

const modifyPassPropTypes = {
    modifyPass: PropTypes.object.isRequired
};

function ModifyPass({modifyPass, dispatch, form, intl}) {
    const {type, visible, oldPass, newPass, confirmPass} = modifyPass;
    const {formatMessage} = intl;
    const {getFieldDecorator} = form;

    const modalOptions = (() => {
        const onConfirm = () => {
            form.validateFields((err, values) => {
                if (!!err) {
                    return;
                }
                dispatch({
                    type: 'modifyPass/doModifyPass',
                    payload: values
                });
                form.resetFields();
            });
        };

        const onCancel = () => {
            dispatch({
                type: 'modifyPass/hideModal'
            });
            form.resetFields();
        };

        return {
            title: type == 'loginPass' ? formatMessage(messages.loginPass): formatMessage(messages.pinPass),
            visible,
            onOk: onConfirm,
            onCancel,
        };
    })();

    const checkNewPass = (rule, value, callback) => {
        if(value && value == form.getFieldValue('oldPass')){
            callback(formatMessage(messages.notEqualToOld));
        }else {
            callback();
        }
        /*if (value) {
            if(value==form.getFieldValue('oldPass')){
                return callback(formatMessage(messages.notEqualToOld));
            }
            let newPassLength = type=='loginPass'?8:6;
            let newPassLengthMessage = type=='loginPass'?'newLoginPassLength':'newPinPassLength';
            if (value.length < newPassLength) {
                return callback(formatMessage(messages[newPassLengthMessage]));
            }
            if (!/^([\d]+[A-Za-z]+)|([A-Za-z]+[\d]+)$/.test(value)) {
                return callback(formatMessage(messages.newPassRule));
            }
            callback();
        }else {
            callback();
        }*/
    };

    const checkConfirmPass = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPass')) {
            callback(formatMessage(messages.notEqualToNew));
        } else {
            callback();
        }
    };

    const onPaste = (e)=>{
        e.preventDefault();
    };

    return (
        <Modal {...modalOptions} wrapClassName='modalStyle-sm'>
            <Form layout="horizontal">
                <FormItem label={formatMessage(messages.oldPass)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('oldPass', {
                            initialValue: oldPass,
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.oldPassRequired)
                                }
                            ]
                        })(
                            <Input type="password"/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.newPass)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('newPass', {
                            initialValue: newPass,
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.newPassRequired)
                                },
                                {
                                    min: type=='loginPass'?8:6,
                                    message: formatMessage(messages[type=='loginPass'?'newLoginPassLength':'newPinPassLength'])
                                },
                                {
                                    pattern: /^([\d]+[A-Za-z]+)|([A-Za-z]+[\d]+)$/,
                                    message: formatMessage(messages.newPassRule)
                                },
                                {
                                    validator: checkNewPass
                                }
                            ]
                        })(
                            <Input type="password" onPaste={onPaste}/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.confirmPass)} hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('confirmPass', {
                            initialValue: confirmPass,
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.confirmPassRequired)
                                },
                                {
                                    validator: checkConfirmPass
                                }
                            ]
                        })(
                            <Input type="password" onPaste={onPaste}/>
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    );
}

ModifyPass.propTypes = modifyPassPropTypes;

function mapStateToProps({modifyPass}) {
    return {modifyPass};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(ModifyPass)), {
    withRef: true,
});
