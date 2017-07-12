import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Popover, Icon, Checkbox} from 'antd';
import {formItemHiddenStyle} from '../../../../../constants/constants';
import {accountType} from '../../../../../enums/enums';
import enumsMessages from '../../../../../enums/enumsMessages';
import CheckCode from '../../../../Common/CheckCode/CheckCode';
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

class CardRechargeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            changeBouquetChecked: false
        };
    }

    static propTypes = {

    };
    /*同时更换包按钮点击事件*/
    onChangeBouquet = ()=>{
        this.setState({
            changeBouquetChecked: !this.state.changeBouquetChecked
        });
    };

    validateCheckCode = (rule, value, callback)=>{
        const {intl: {formatMessage}} = this.props;
        if(value!='' && !value){
            callback(formatMessage(messages.checkCodeError));
        }else {
            callback();
        }
    };

    render(){
        const {intl, form, currentBouquet, products, filterProducts} = this.props;
        const {changeBouquetChecked} = this.state;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;

        return (
            <div>
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
                <FormItem label={formatMessage(messages.currentBouquet)} {...formItemLayout}>
                    {
                        getFieldDecorator('currentBouquet', {
                            initialValue: currentBouquet
                        })(
                            <Input type="text" disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Checkbox onChange={this.onChangeBouquet} checked={changeBouquetChecked}>
                        <FormattedMessage {...messages.changeBouquetBox}/>
                    </Checkbox>
                </FormItem>
                <FormItem label={formatMessage(messages.businessClass)} {...formItemLayout}>
                    {
                        getFieldDecorator('businessClass', {
                            rules: [
                                {
                                    required: changeBouquetChecked,
                                    message: formatMessage(messages.businessClassRule)
                                }
                            ]
                        })(
                            <RadioGroup onChange={filterProducts} disabled={!changeBouquetChecked}>
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
                                    required: changeBouquetChecked,
                                    message: formatMessage(messages.productCodeRule)
                                }
                            ]
                        })(
                            <RadioGroup disabled={!changeBouquetChecked}>
                                {
                                    products.map(({code, externalName, monthAmount, description}, index) =>
                                        <Radio value={code} key={index} style={{display: 'block'}}>
                                            {`${externalName} (${monthAmount})`}
                                            <Popover placement="right" content={description} >
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
            </div>
        );
    }
}

export default CardRechargeForm;