import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Radio, Popover, Icon} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import {accountType} from '../../../../../enums/enums';
import CheckCode from '../../../../Common/CheckCode/CheckCode';
import enumsMessages from '../../../../../enums/enumsMessages';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const changeBouquetModalPropTypes = {
    customerServiceChangeBouquet: PropTypes.object.isRequired,
};

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
function ChangeBouquetModal({
    intl,
    form,
    dispatch,
    customerServiceChangeBouquet
}) {

    const {
        editorVisible,
        subscriberId,
        currentBouquet,
        products,
        changeBouquetSuccess
    } = customerServiceChangeBouquet;

    const {formatMessage} = intl;

    const {getFieldDecorator} = form;

    /*换包编辑弹窗属性定义*/
    const modalOptions = (() => {
        const onOk = () => {
            form.validateFields((err, values) => {
                if (!!err) {
                    return;
                }
                dispatch({
                    type: 'customerServiceChangeBouquet/doChangeBouquet',
                    payload: values
                });
            });
        };

        const onCancel = () => {
            dispatch({
                type: 'customerServiceChangeBouquet/hideModal',
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

    /*业务类型变更，查询可更换包事件*/
    const queryProducts = (e) => {
        dispatch({
            type: 'customerServiceChangeBouquet/filterProducts',
            payload: {
                businessClass: e.target.value
            }
        });
    };

    /*生成验证码组件*/
    const CheckCodeGen = () => <CheckCode color="red" captchaType="Normal" size="4" form={form} intl={intl}/>;

    /*更换包成功提示弹窗属性*/
    const modalAlertProps = {
        type: 'success',
        title: <FormattedMessage {...messages.successTitle}/>,
        content: <FormattedMessage {...messages.successContent}/>,
        onOk(){
            dispatch({
                type: 'customerServiceChangeBouquet/hideChangeBouquetSuccessModal'
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
                    <FormItem label={formatMessage(messages.currentBouquet)} {...formItemLayout}>
                        {
                            getFieldDecorator('currentBouquet', {
                                initialValue: currentBouquet
                            })(
                                <Input type="text" disabled={true}/>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.businessClass)} {...formItemLayout}>
                        {
                            getFieldDecorator('businessClass', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.businessClassRule)
                                    }
                                ]
                            })(
                                <RadioGroup onChange={queryProducts}>
                                    <Radio value={1} key={1}>
                                        <FormattedMessage {...enumsMessages.businessClass.DTT}/>
                                    </Radio>
                                    <Radio value={0} key={0}>
                                        <FormattedMessage {...enumsMessages.businessClass.DTH}/>
                                    </Radio>
                                    <Radio value={2} key={2}>
                                        <FormattedMessage {...enumsMessages.businessClass.TV}/>
                                    </Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label={formatMessage(messages.productCode)} {...formItemLayout}>
                        {
                            getFieldDecorator('productCode', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.productCodeRule)
                                    }
                                ]
                            })(
                                <RadioGroup>
                                    {
                                        products.map(({code, externalName, monthAmount, description}, index) =>
                                            <Radio value={code} key={index} style={{display: 'block'}}>
                                                {`${externalName} (${monthAmount})`}
                                                <Popover placement="right" content={description}>
                                                    <Icon type="question-circle-o" style={{marginLeft: 6}}/>
                                                </Popover>
                                            </Radio>
                                        )
                                    }
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <CheckCode color="green" captchaType="Normal" size="4" form={form} intl={intl}/>
                </Form>
            </Modal>
            {
                changeBouquetSuccess && <ModalAlert {...modalAlertProps}/>
            }
        </div>
    );
}

ChangeBouquetModal.propTypes = changeBouquetModalPropTypes;

function mapStateToProps({customerServiceChangeBouquet}) {
    return {customerServiceChangeBouquet};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(ChangeBouquetModal)));