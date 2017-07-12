import React, {PropTypes, Component} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import logoLogin from '../../assets/logo_login.png';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;

/*
 * 函数组件尽量使用 function fnName(){} 声明，
 * const fnName = ()=>{} 这种匿名函数的声明方式在babel配置错误的情况下会产生隐含的难以理解的bug，
 * 而且也会导致某些测试库如 Jest 的问题，所以不建议使用
 * 参数中要解构 props 对象，如下所示
 * */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    /*
     * 要在最顶端声明propTypes，使它们优先可见
     * 只需要声明我们自己传入的属性
     * */
    static propTypes = {
        login: PropTypes.object.isRequired
    };

    /*登录按钮点击事件*/
/*    enterLoading = () => {
        this.setState({
            loading: true
        });
    };*/

    /*
    * 在账户密码错误的情况下
    * 如果重新输入，则重置loading=false
    * */
    resetLoading = ()=>{
        if(this.state.loading){
            this.setState({
                loading: false
            });
        }
    };

    /*登录表单提交事件*/
    handleSubmit = (e) => {
        const {dispatch, form} = this.props;
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.setState({
                loading: true
            });
            dispatch({
                type: 'login/doLogin',
                payload: {
                    ...values
                }
            });
        })
    };

    render() {
        const {intl: {formatMessage}, form} = this.props;
        const {getFieldDecorator} = form;
        const {loading} = this.state;
        return (
            <div className={styles.login}>
                <img src={logoLogin} alt="Startimes" className={styles.logoLogin}/>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>
                        <FormattedMessage {...messages.title}/>
                    </h2>
                    <Form layout="horizontal" className={styles.formContainer} onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.username.vtype)
                                        },
                                        {
                                            pattern: /^[0-9]+$/,
                                            message: formatMessage(messages.username.numericString)
                                        }
                                    ]
                                })(
                                    <Input
                                        addonBefore={<Icon type="user"/>}
                                        placeholder={formatMessage(messages.username.label)}
                                        onFocus={this.resetLoading}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem hasFeedback>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.password.vtype)
                                        }
                                    ]
                                })(
                                    <Input
                                        addonBefore={<Icon type="lock"/>}
                                        type="password"
                                        placeholder={formatMessage(messages.password.label)}
                                        onFocus={this.resetLoading}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>
                                        <FormattedMessage {...messages.remember}/>
                                    </Checkbox>
                                )}
                            <a className={styles.loginFormForgot}>
                                <FormattedMessage {...messages.forgotPass}/>
                            </a>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.loginFormButton}
                                loading={loading}
                                //onClick={this.enterLoading}
                            >
                                <FormattedMessage {...messages.login}/>
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({login}) {
    return {login};
}

/*高阶组件包装*/
export default injectIntl(connect(mapStateToProps)(Form.create()(Login)), {
    withRef: true,
});
