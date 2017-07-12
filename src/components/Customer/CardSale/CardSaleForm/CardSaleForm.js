import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Select, Button, InputNumber, Row, Col, Modal, Cascader} from 'antd';
import messages from './messages';
import {formItemLayout, formItemHiddenStyle} from '../../../../constants/constants';
import {numberFormat} from '../../../../utils/util';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import ModalAlert from '../../../Common/ModalAlert/ModalAlert';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const buttonItemLayout = {
    wrapperCol: {
        span: 20
    },
};

class CardSaleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            total: 0,
            money: 0,
            amount: 1
        };
    }

    static propTypes = {
        cardSale: PropTypes.object.isRequired
    };

    /*电子卡选择按钮*/
    onVoucherCardChange = (e) => {
        const {cardSale} = this.props;
        const {voucherCards} = cardSale;
        const voucherCard = voucherCards.filter(card=> card.id==e.target.value)[0];
        this.setState({
            money: voucherCard.unitPrice,
            total: voucherCard.unitPrice * this.state.amount
        });
    };

    /*数量输入框变更事件*/
    onAmountChange = (value) => {
        let amount = value == '' ? 1 : value;
        this.setState({
            amount: amount,
            total: parseInt(amount) * this.state.money
        });
    };

    /*提交表单*/
    onSubmit = (e) => {
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!!err) {
                return;
            }
            this.setState({
                loading: true
            });
            values['total'] = this.state.total;
            dispatch({
                type: 'cardSale/submitCardSaleInfo',
                payload: values
            });
        });
    };

    /*重置按钮点击事件*/
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            loading: false,
            amount: 1,
            total: 0
        });
    };

    /*
     * 网络异常情况下，输入框获取焦点
     * 如果重新输入，则重置loading=false
     * */
    resetLoading = () => {
        if (this.state.loading) {
            this.setState({
                loading: false
            });
        }
    };

    /*激活成功提示弹窗属性*/
    modalAlertPropsGen = () => {
        const {form, dispatch} = this.props;
        const resetState = () => {
            this.setState({
                loading: false,
                amount: 1,
                total: 0
            });
        };
        return {
            type: 'success',
            title: <FormattedMessage {...messages.successTitle}/>,
            content: <FormattedMessage {...messages.successContent}/>,
            onOk: () => {
                resetState();
                dispatch({
                    type: 'cardSale/resetCardSaleSuccess'
                });
                form.resetFields();
            }
        };
    };

    render() {
        const {
            intl,
            form,
            cardSale
        } = this.props;

        const {formatMessage} = intl;
        const {getFieldDecorator} = form;

        const {
            balance,
            voucherCards,
            cardSaleSuccess
        } = cardSale;

        const modalAlertProps = this.modalAlertPropsGen();
        const {loading, total, amount} = this.state;
        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Form layout='horizontal' onSubmit={this.onSubmit} className={styles.subscriberActiveForm}>
                    <span className='formColumn'>
                        <FormItem label={formatMessage(messages.balance)} {...formItemLayout}>
                            {
                                getFieldDecorator('balance', {
                                    initialValue: numberFormat(balance),
                                })(
                                    <Input type='text' disabled={true} onFocus={this.resetLoading}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.mobileNumber)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('mobile', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.mobileNumberRule)
                                        }
                                    ]
                                })(
                                    <Input type='text' onFocus={this.resetLoading}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.voucherCard)} {...formItemLayout}>
                            {
                                getFieldDecorator('cardSpecId', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.voucherCardRule)
                                        },
                                    ]
                                })(
                                    <RadioGroup onChange={this.onVoucherCardChange} onFocus={this.resetLoading}>
                                        {
                                            voucherCards.map((card, index) =>
                                                <Radio value={card.id} key={index}>
                                                    {card.amount}
                                                </Radio>
                                            )
                                        }
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.amount)} {...formItemLayout} hasFeedback>
                            <Row gutter={8}>
                                <Col span={12}>
                                     {
                                          getFieldDecorator('amount', {
                                              initialValue: 1,
                                              rules: [
                                                  {
                                                      required: true,
                                                      message: formatMessage(messages.amountRule)
                                                  },
                                              ]
                                          })(
                                              <InputNumber
                                                  onFocus={this.resetLoading}
                                                  onChange={this.onAmountChange}
                                                  precision={0}
                                                  style={{width: '100%'}}
                                              />
                                          )
                                     }
                                </Col>
                                <Col span={12}>
                                    <span><FormattedMessage {...messages.total}/>: {total}</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label={formatMessage(messages.pin)} {...formItemLayout}>
                            {
                                getFieldDecorator('payPIN', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.pinRule)
                                        }
                                    ]
                                })(
                                    <Input type="password" onFocus={this.resetLoading}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...buttonItemLayout} style={{textAlign: 'right'}}>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                style={{marginRight: 10}}
                                loading={loading}
                            >
                                Submit
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={this.handleReset}
                            >
                                Reset
                            </Button>
                        </FormItem>
                    </span>
                </Form>
                {
                    cardSaleSuccess && <ModalAlert {...modalAlertProps}/>
                }
            </div>
        );
    }
}

function mapStateToProps({cardSale}) {
    return {cardSale};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(CardSaleForm)));
