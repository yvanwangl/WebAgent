import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Modal, Form, Input, Radio} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import DirectRechargeForm from './DirectRechargeForm';
import CardRechargeForm from './CardRechargeForm';
import {formItemHiddenStyle} from '../../../../../constants/constants';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 18
    }
};

/*
 * 单独调用的 modal 在关闭的时候一定要手动进行表单的重置
 * form.resetFields();
 * 同时将使用到的models中的state也进行重置
 * */
class RechargeModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            rechargeType: 0,
            duration: 0
        };
    }

    static propTypes = {
        customerServiceRecharge: PropTypes.object.isRequired,
    };

    /*充值编辑弹窗属性定义*/
    modalOptionsGen = ()=>{
        const {intl, form, dispatch, customerServiceRecharge} = this.props;
        const {formatMessage} = intl;
        const {editorVisible} = customerServiceRecharge;
        const resetState = ()=>{
            this.setState({
                rechargeType: 0
            });
        };
        const onOk = ()=>{
            form.validateFields((err, values)=>{
                if(!!err){
                    return;
                }
                if(values['duration']==0){
                    values['duration'] = this.state.duration;
                }
                dispatch({
                    type: 'customerServiceRecharge/doRecharge',
                    payload: values
                });
            });
        };

        const onCancel = ()=>{
            dispatch({
                type: 'customerServiceRecharge/hideModal',
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

    /*直冲类型表单属性*/
    directRechargePropsGen = ()=>{
        const {intl, form, dispatch, customerServiceRecharge} = this.props;
        const {currentBouquet, products} = customerServiceRecharge;
        const getDurationValue = (value)=>{
            this.setState({
                duration: value
            });
        };
        return {
            intl,
            form,
            currentBouquet,
            products,
            getDurationValue,
            filterProducts(e){
                dispatch({
                    type: 'customerServiceRecharge/filterProducts',
                    payload: {
                        businessClass: e.target.value
                    }
                });
            }
        };
    };

    /*充值卡充值类型表单属性*/
    cardRechargePropsGen = ()=>{
        const {intl, form, dispatch, customerServiceRecharge} = this.props;
        const {currentBouquet, products} = customerServiceRecharge;
        return {
            intl,
            form,
            currentBouquet,
            products,
            filterProducts(e){
                dispatch({
                    type: 'customerServiceRecharge/filterProducts',
                    payload: {
                        businessClass: e.target.value
                    }
                });
            }
        };
    };

    /*更换包成功提示弹窗属性*/
    modalAlertPropsGen = ()=>{
        const {form, dispatch} = this.props;
        const resetState = ()=>{
            this.setState({
                rechargeType: 0
            });
        };
        return {
            type: 'success',
            title: <FormattedMessage {...messages.successTitle}/>,
            content: <FormattedMessage {...messages.successContent}/>,
            onOk(){
                dispatch({
                    type: 'customerServiceRecharge/hideRechargeSuccessModal'
                });
                form.resetFields();
                resetState();
            },
        };
    };

    /*充值类型变更事件*/
    handleRechargeType = (e)=>{
        const {dispatch} = this.props;
        this.setState({
            rechargeType: e.target.value
        });
        dispatch({
            type: 'customerServiceRecharge/resetProducts'
        });
    };

    render(){
        const {intl, form, customerServiceRecharge} = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        const {subscriberId, rechargeSuccess} = customerServiceRecharge;
        const modalOptions = this.modalOptionsGen();
        const directRechargeProps = this.directRechargePropsGen();
        const cardRechargeProps = this.cardRechargePropsGen();
        const modalAlertProps = this.modalAlertPropsGen();
        const {rechargeType} = this.state;
        return (
            <div>
                <Modal {...modalOptions} wrapClassName='modalStyle-lg'>
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
                        <FormItem label={formatMessage(messages.rechargeType)} {...formItemLayout}>
                            {
                                getFieldDecorator('rechargeType', {
                                    initialValue: 0,
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.rechargeTypeRule)
                                        }
                                    ]
                                })(
                                    <RadioGroup onChange={this.handleRechargeType}>
                                        <Radio value={0}>Remote top-up</Radio>
                                        <Radio value={1}>Voucher Card</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        {
                            rechargeType==0?
                                <DirectRechargeForm {...directRechargeProps}/>:
                                <CardRechargeForm {...cardRechargeProps}/>
                        }
                    </Form>
                </Modal>
                {
                    rechargeSuccess && <ModalAlert {...modalAlertProps}/>
                }
            </div>
        );
    }
}

function mapStateToProps({customerServiceRecharge}) {
    return {customerServiceRecharge};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(RechargeModal)));