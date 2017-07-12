import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Radio} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import CheckCode from '../../../../Common/CheckCode/CheckCode';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const refreshAuthModalPropTypes = {
    customerServiceRefreshAuth: PropTypes.object.isRequired,
};

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
function RefreshAuthModal({
    intl,
    form,
    dispatch,
    customerServiceRefreshAuth
}) {

    const {
        editorVisible,
        subscriberId,
        refreshAuthSuccess
    } = customerServiceRefreshAuth;

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;

    /*换包编辑弹窗属性定义*/
    const modalOptions = (()=>{
        const onOk = ()=>{
            form.validateFields((err, values)=>{
                if(!!err){
                    return;
                }
                dispatch({
                    type: 'customerServiceRefreshAuth/doRefreshAuth',
                    payload: values
                });
            });
        };

        const onCancel = ()=>{
            dispatch({
                type: 'customerServiceRefreshAuth/hideModal',
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
                type: 'customerServiceRefreshAuth/hideRefreshAuthSuccessModal'
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
                            getFieldDecorator('subscriberId', {
                                initialValue: subscriberId
                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.reason)} {...formItemLayout}>
                        {
                            getFieldDecorator('reason', {
                                initialValue: 1,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.reasonRule)
                                    }
                                ]
                            })(
                                <RadioGroup>
                                    <Radio value={1}>Some channels  show "no access".</Radio>
                                    <Radio value={2}>ALL channels  show "no access".</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <CheckCode color="green" captchaType="Normal" size="4" form={form} intl={intl}/>
                </Form>
            </Modal>
            {
                refreshAuthSuccess && <ModalAlert {...modalAlertProps}/>
            }
        </div>
    );
}

RefreshAuthModal.propTypes = refreshAuthModalPropTypes;

function mapStateToProps({customerServiceRefreshAuth}) {
    return {customerServiceRefreshAuth};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(RefreshAuthModal)));