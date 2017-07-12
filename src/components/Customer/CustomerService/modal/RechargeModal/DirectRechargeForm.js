import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Popover, Icon} from 'antd';
import ModalAlert from '../../../../Common/ModalAlert/ModalAlert';
import {formItemHiddenStyle} from '../../../../../constants/constants';
import {accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import {numberFormat} from '../../../../../utils/util';
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
class DirectRechargeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            other: null,
            money: 0,
            otherDisabled: true
        };
        /*充值月数
         * [value, label]
         * */
        this.durations = [
            [1, 'one'],
            [3, 'three'],
            [6, 'six'],
            [12, 'twelve'],
            [0, 'other']
        ]
    }

    static propTypes = {};

    /*充值包变更事件*/
    handleBouquetChange = (e)=>{
        this.setState({
            code: e.target.value
        });
    };

    /*充值月数变更事件*/
    handleDurationChange = (e)=>{
        const {products} = this.props;
        const {code} = this.state;
        const targetProduct = products.filter(product=> product.code==code);
        if(targetProduct.length==1){
            const targetMoney = targetProduct[0].monthAmount;
            this.setState({
                money: e.target.value*targetMoney
            });
        }
        this.setState({
            otherDisabled: e.target.value!=0
        });
        if(e.target.value!=0) {
            this.setState({
                other: null
            });
        }
    };

    /*其他月数输入框变更事件*/
    handleOtherChange = (e) => {
        const {getDurationValue} = this.props;
        if(e.target.value==''){
            this.setState({
                other: 0
            });
            getDurationValue(0)
        }else {
            this.setState({
                other: parseInt(e.target.value)
            });
            getDurationValue(parseInt(e.target.value))
        }
    };

    render() {
        const {
            intl,
            form,
            currentBouquet,
            products,
            filterProducts
        } = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        const {other, money, otherDisabled} = this.state;

        return (
            <div>
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
                            <RadioGroup onChange={(e) => filterProducts(e)}>
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
                            <RadioGroup onChange={this.handleBouquetChange}>
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
                <FormItem label={formatMessage(messages.duration)} {...formItemLayout}>
                    {
                        getFieldDecorator('duration', {
                            initialValue: 1,
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.durationRule)
                                }
                            ]
                        })(
                            <RadioGroup onChange={this.handleDurationChange}>
                                {
                                    this.durations.map(([value, label], index) => {
                                            if (label == 'other') {
                                                return (
                                                    <Radio value={value} key={label}>
                                                        <span>
                                                            <Input
                                                                type="number"
                                                                style={{width: 80, marginRight:5}}
                                                                disabled={otherDisabled}
                                                                onChange={this.handleOtherChange}
                                                                value={other}
                                                            />
                                                            <FormattedMessage {...messages.durationItem.other}/>
                                                        </span>
                                                    </Radio>
                                                )
                                            } else {
                                                return (
                                                    <Radio value={value} key={label}>
                                                        <FormattedMessage {...messages.durationItem[label]}/>
                                                    </Radio>
                                                )
                                            }
                                        }
                                    )
                                }
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.money)} {...formItemLayout}>
                    {
                        getFieldDecorator('money', {
                            initialValue: numberFormat(money)
                        })(
                            <Input type="text" disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem label={formatMessage(messages.pin)} {...formItemLayout}>
                    {
                        getFieldDecorator('pin', {
                            initialValue: '',
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
            </div>
        );
    }
}

export default DirectRechargeForm;