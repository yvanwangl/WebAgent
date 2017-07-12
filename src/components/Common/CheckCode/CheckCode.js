import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {formItemLayout} from '../../../constants/constants';
import {Form, Input, Button} from 'antd';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;

class CheckCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: '',
            validate: '',
            validateInput: ''
        };
    }

    static defaultProps = {
        size: 4,
        captchaType: 'Normal'
    };

    componentDidMount() {
        this.renderCode();
    }

    renderCode = () => {
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        let expression = '', result;
        //判断验证码类型    
        if (this.props.captchaType == 'Calculation') {
            result = 0;//计算类型则result为数字，初始化为0
            //获取随机的两个两位数
            let Calpre = Math.round(Math.random() * 100);
            let Calafter = Math.round(Math.random() * 100);

            let codeCal = ['-', '+', 'x'];//运算符
            let i = Math.round(Math.random() * 2);//获得随机运算符

            switch (codeCal[i]) {//判断运算符并计算
                case '-':
                    expression = Calpre + '-' + Calafter;
                    result = Calpre - Calafter;
                    break;
                case '+':
                    expression = Calpre + '+' + Calafter;
                    result = Calpre + Calafter;
                    break;
                case 'x':
                    expression = Calpre + 'x' + Calafter;
                    result = Calpre * Calafter;
                    break;
            }
        } else if (this.props.captchaType == 'Normal') {
            result = '';
            let codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
            for (let i = 0; i < this.props.size; i++) {
                result = result + codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
            }//随机获取字母四个

            expression = result;//忽略大小写
        }

        this.setState({//设置更新状态
            expression: expression,
            validate: result
        });
    };

    handleChange = (e) => {
        this.setState({
            validateInput: e.target.value
        });
    };

    validate = () => {
        let {form} = this.props;
        let thisInput = this.state.validateInput;
        let validateCode = this.state.validate;
        let checkCode=false;
        if (thisInput.toLowerCase() == validateCode.toString().toLowerCase()) {
            checkCode=true;
        } else if (thisInput != '') {
            checkCode=false;
        }
        form.setFieldsValue({
            checkCode: checkCode
        });
        form.validateFields();
    };

    /*验证码校验*/
    validateCheckCode = (rule, value, callback) => {
        const {intl: {formatMessage}} = this.props;
        if (value !== '' && !value) {
            callback(formatMessage(messages.checkCodeError));
        } else {
            callback();
        }
    };

    render() {
        let inlineStyle = {
            color: this.props.color,
            backgroundImage: 'url(' + this.props.bgImage + ')',
            width: '30%',
            letterSpacing: 1
        };
        const {intl, form} = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        return (
            <div>
                <FormItem label={formatMessage(messages.checkCode)} {...formItemLayout}>
                    {
                        getFieldDecorator('checkCode', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.checkCodeRule)
                                },
                                {
                                    validator: this.validateCheckCode
                                }
                            ]
                        })(
                            <div>
                                <Input
                                    value={this.state.validateInput}
                                    placeholder={formatMessage(messages.placeHolder)}
                                    onBlur={this.validate}
                                    ref="field"
                                    onChange={this.handleChange}
                                    hasFeedback
                                    style={{width: '60%', marginRight: 10}}
                                />
                                <Button style={inlineStyle}
                                        className="am-btn"
                                        onClick={this.renderCode}
                                >
                                    {this.state.expression}</Button>
                            </div>
                        )
                    }
                </FormItem>
            </div>
        );
    }
}

export default injectIntl(CheckCode, {
    withRef: true,
});