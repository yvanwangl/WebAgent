import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Select, Checkbox} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import {formItemLayout, formItemHiddenStyle} from '../../../../../constants/constants';
import {accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import CheckCode from '../../../../Common/CheckCode/CheckCode';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
class ChangeCardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smartCardChecked: false,
            stbChecked: false
        };
    }

    static propTypes = {
        customerServiceChangeCard: PropTypes.object.isRequired,
    };

    /*弹窗配置属性*/
    modalOptionsGen = () => {
        const {intl, form, dispatch, customerServiceChangeCard} = this.props;
        const {editorVisible} = customerServiceChangeCard;
        const {formatMessage} = intl;
        const onOk = () => {
            form.validateFields((err, values) => {
                if (!!err) {
                    return;
                }
                dispatch({
                    type: 'customerServiceChangeCard/doChangeCard',
                    payload: values
                });
            });
        };

        const onCancel = () => {
            dispatch({
                type: 'customerServiceChangeCard/hideModal',
            });
            form.resetFields();
        };

        return {
            title: formatMessage(messages.title),
            visible: editorVisible,
            onOk,
            onCancel
        };
    };

    /*更换智能卡复选框变更事件*/
    onChangeSmartCard = (e) => {
        const {form} = this.props;
        this.setState({
            smartCardChecked: !this.state.smartCardChecked
        });
        form.setFieldsValue({
            smartCardCode: '',
            smartCardResourceStatus: ''
        });
    };

    /*更换机顶盒复选框变更事件*/
    onChangeStb = (e) => {
        const {form} = this.props;
        this.setState({
            stbChecked: !this.state.stbChecked
        });
        form.setFieldsValue({
            stbCode: '',
            stbResourceStatus: ''
        });
    };

    /*更换包成功提示弹窗属性*/
    modalAlertPropsGen = () => {
        const {form, dispatch} = this.props;
        const resetState = ()=>{
            this.setState({
                smartCardChecked: false,
                stbChecked: false
            });
        };
        return {
            type: 'success',
            title: <FormattedMessage {...messages.successTitle}/>,
            content: <FormattedMessage {...messages.successContent}/>,
            onOk:()=>{
                resetState();
                dispatch({
                    type: 'customerServiceChangeCard/hideChangeCardSuccessModal'
                });
                form.resetFields();
            }
        }
    };

    render() {
        const modalOptions = this.modalOptionsGen();
        const {intl, form, customerServiceChangeCard} = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        const {subscriberId, resourceStatus, changeCardSuccess} = customerServiceChangeCard;
        const {smartCardChecked, stbChecked} = this.state;
        const modalAlertProps = this.modalAlertPropsGen();
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
                        <FormItem>
                            <Checkbox onChange={this.onChangeSmartCard} checked={smartCardChecked}>
                                <FormattedMessage {...messages.smartCardCheckBox}/>
                            </Checkbox>
                        </FormItem>
                        <FormItem label={formatMessage(messages.newCode)} hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('smartCardCode', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: smartCardChecked,
                                            message: formatMessage(messages.newCodeRule)
                                        }
                                    ]
                                })(
                                    <Input type="text" disabled={!smartCardChecked}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.resourceStatus)} hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('smartCardResourceStatus', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: smartCardChecked,
                                            message: formatMessage(messages.resourceStatusRule)
                                        }
                                    ]
                                })(
                                    <Select disabled={!smartCardChecked}>
                                        {
                                            resourceStatus.map(({id, name}) =>
                                                <Option value={id} key={id}>
                                                    {name}
                                                </Option>
                                            )
                                        }

                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem>
                            <Checkbox onChange={this.onChangeStb} checked={stbChecked}>
                                <FormattedMessage {...messages.stbCheckBox}/>
                            </Checkbox>
                        </FormItem>
                        <FormItem label={formatMessage(messages.newCode)} hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('stbCode', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: stbChecked,
                                            message: formatMessage(messages.newCodeRule)
                                        }
                                    ]
                                })(
                                    <Input type="text" disabled={!stbChecked}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.resourceStatus)} hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('stbResourceStatus', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: stbChecked,
                                            message: formatMessage(messages.resourceStatusRule)
                                        }
                                    ]
                                })(
                                    <Select disabled={!stbChecked}>
                                        {
                                            resourceStatus.map(({id, name}) =>
                                                <Option value={id} key={id}>
                                                    {name}
                                                </Option>
                                            )
                                        }

                                    </Select>
                                )
                            }
                        </FormItem>
                        <CheckCode color="green" captchaType="Normal" size="4" form={form} intl={intl}/>
                    </Form>
                </Modal>
                {
                    changeCardSuccess && <ModalAlert {...modalAlertProps}/>
                }
            </div>
        );
    }
}

function mapStateToProps({customerServiceChangeCard}) {
    return {customerServiceChangeCard};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(ChangeCardModal)));