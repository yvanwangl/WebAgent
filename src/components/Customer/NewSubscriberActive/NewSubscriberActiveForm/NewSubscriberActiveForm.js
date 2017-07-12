import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Select, Button, TreeSelect, Popover, Icon, Modal, Cascader} from 'antd';
import messages from './messages';
import {formItemLayout, formItemHiddenStyle} from '../../../../constants/constants';
import {businessClass} from '../../../../enums/enums';
import enumsMessages from '../../../../enums/enumsMessages';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import ModalAlert from '../../../Common/ModalAlert/ModalAlert';
import ProductBouquet from '../../CustomerCommon/ProductBouquet/ProductBouquet';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const buttonItemLayout = {
    wrapperCol: {
        span: 20
    },
};

class NewSubscriberActiveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    static propTypes = {
        newSubscriberActive: PropTypes.object.isRequired
    };

    /*生成地址树*/
    addressTreeNodes = (addresses, saleAddressId) => {
        const treeNodes = [];
        const addressList = addresses.map(address => Object.assign({}, address, {children: []}));
        for (let address of addressList) {
            address['key'] = `${address.id}`;
            address['value'] = `${address.id}`;
            address['label'] = address.name;
            if (address.parentId == saleAddressId) {
                treeNodes.push(address);
            } else {
                for (let item of addressList) {
                    if (address.parentId == item.id) {
                        item.children.push(address);
                    }
                }
            }
        }
        return treeNodes;
    };

    /*查询可激活的产品包*/
    queryProducts = (value, type) => {
        const {form, dispatch} = this.props;
        const formValues = form.getFieldsValue(['businessClass', 'smartCardCode', 'stbCode', 'addressId']);
        /*
         * 此处需要做处理主要是因为组件的onChange事件是异步的，当前获取到的表单值是更改之前的值
         * 此处获取到的是业务分类或者地址的集合，集合中的最后一项为最后一个地址节点的 id标识字符串
         */
        if (value != undefined) {
            formValues[type] = value;
        }
        const canQuery = Object.keys(formValues).every(key => formValues[key] !== null && formValues[key] !== '');
        const addressIds = formValues['addressId'];
        /*地址即是清空也会获得一个[]空数组，所以需要判断地址不能为空*/
        if (canQuery && addressIds.length > 0) {
            formValues['addressId'] = parseInt(addressIds[addressIds.length - 1]);
            dispatch({
                type: 'newSubscriberActive/queryProducts',
                payload: formValues
            });
        } else {
            dispatch({
                type: 'newSubscriberActive/resetProducts'
            });
        }
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
            const addressIds = values['addressId'];
            values['addressId'] = parseInt(addressIds[addressIds.length - 1]);
            dispatch({
                type: 'newSubscriberActive/submitActiveInfo',
                payload: values
            });
        });
    };

    /*
     * 校验地址是否必填
     * 如果销售区域为空则地址可为空，如果销售区域不为空地址必填
     * */
    checkAddressId = (rule, value, callback) => {
        const {intl, newSubscriberActive} = this.props;
        const {formatMessage} = intl;
        const {saleAddressName} = newSubscriberActive;
        if (saleAddressName != null && saleAddressName != '' && value == null) {
            callback('地址不能为空');
        } else {
            callback();
        }
    };

    /*重置按钮点击事件*/
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            loading: false
        });
    };

    /*查询产品包失败提示弹窗属性*/
    /*errorModalPropsGen = ()=>{
     const {dispatch, newSubscriberActive} = this.props;
     const {errorLevel, errorCode} = newSubscriberActive;
     return {
     type: errorLevel.toLowerCase(),
     title: <FormattedMessage {...messages.errorCodeTitle}/>,
     content: <FormattedMessage {...messages.errorCode[errorCode]}/>,
     onOk: () => {
     dispatch({
     type: 'newSubscriberActive/resetErrorCode'
     });
     }
     };
     };*/

    /*激活成功提示弹窗属性*/
    modalAlertPropsGen = () => {
        const {form, dispatch} = this.props;
        const resetState = () => {
            this.setState({
                load: false
            });
        };
        return {
            type: 'success',
            title: <FormattedMessage {...messages.successTitle}/>,
            content: <FormattedMessage {...messages.successContent}/>,
            onOk: () => {
                resetState();
                dispatch({
                    type: 'newSubscriberActive/resetActiveSuccess'
                });
                form.resetFields();
            }
        };
    };

    render() {
        const {
            intl,
            form,
            newSubscriberActive
        } = this.props;

        const {formatMessage} = intl;
        const {getFieldDecorator} = form;

        const {
            saleAddressId,
            saleAddressName,
            addresses,
            products,
            activeSuccess,
            customerName
        } = newSubscriberActive;

        const addressList = this.addressTreeNodes(addresses, saleAddressId);

        const modalAlertProps = this.modalAlertPropsGen();
        const {loading} = this.state;
        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Form layout='horizontal' onSubmit={this.onSubmit} className={styles.subscriberActiveForm}>
                    <span className='formColumn'>
                        <FormItem label={formatMessage(messages.businessClass)} {...formItemLayout}>
                            {
                                getFieldDecorator('businessClass', {
                                    initialValue: 1
                                })(
                                    <RadioGroup onChange={(e) => this.queryProducts(e.target.value, 'businessClass')}>
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
                        <FormItem label={formatMessage(messages.smartCardCode)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('smartCardCode', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.smartCardCodeRule)
                                        },
                                        {
                                            len: 11,
                                            message: formatMessage(messages.smartCardCodeLenRule)
                                        }
                                    ]
                                })(
                                    <Input type='text'
                                           onChange={(e) => this.queryProducts(e.target.value, 'smartCardCode')}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.stbCode)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('stbCode', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.stbCodeRule)
                                        },
                                        {
                                            len: 17,
                                            message: formatMessage(messages.stbCodeLenRule)
                                        }
                                    ]
                                })(
                                    <Input type='text' onChange={(e) => this.queryProducts(e.target.value, 'stbCode')}/>
                                )
                            }
                        </FormItem>
                        <FormItem label={customerName==1?formatMessage(messages.customerName):formatMessage(messages.customerFirstName)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('customerFirstName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: customerName==1?formatMessage(messages.customerNameRule):formatMessage(messages.customerFirstNameRule)
                                        }
                                    ]
                                })(
                                    <Input type='text'/>
                                )
                            }
                        </FormItem>
                        {
                            customerName == 2 ?
                                <FormItem label={formatMessage(messages.customerLastName)} {...formItemLayout}
                                          hasFeedback>
                                    {
                                        getFieldDecorator('customerLastName', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: formatMessage(messages.customerLastNameRule)
                                                }
                                            ]
                                        })(
                                            <Input type='text'/>
                                        )
                                    }
                                </FormItem> : null
                        }
                        <FormItem label={formatMessage(messages.mobileNumber)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('mobileNumber', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.mobileNumberRule)
                                        }
                                    ]
                                })(
                                    <Input type='text'/>
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.email)} {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('email', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            type: 'email',
                                            message: formatMessage(messages.emailRule)
                                        }
                                    ]
                                })(
                                    <Input />
                                )
                            }
                        </FormItem>
                        <FormItem label={formatMessage(messages.address)} {...formItemLayout}>
                            <div>
                                <div className={styles.addressContainer}>
                                    <FormItem style={{width: '49%'}}>
                                        {
                                            getFieldDecorator('saleAddressName', {
                                                initialValue: saleAddressName
                                            })(
                                                <Input type="text" disabled={true}/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem style={{width: '49%'}}>
                                        {
                                            getFieldDecorator('addressId', {
                                                initialValue: '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: formatMessage(messages.addressIdRule)
                                                    },
                                                    {
                                                        validator: this.checkAddressId
                                                    }
                                                ]
                                            })(
                                                <Cascader
                                                    options={addressList}
                                                    expandTrigger="click"
                                                    changeOnSelect={true}
                                                    onChange={(value) => this.queryProducts(value, 'addressId')}
                                                    placeholder="Please select"
                                                />
                                            )
                                        }
                                    </FormItem>
                                </div>
                                <FormItem style={{width: '100%', marginTop: 10}}>
                                    {
                                        getFieldDecorator('detailAddress', {
                                            initialValue: ''
                                        })(
                                            <Input type='text'/>
                                        )
                                    }
                                </FormItem>
                            </div>
                        </FormItem>
                        <FormItem label={formatMessage(messages.code)} {...formItemLayout}>
                            {
                                getFieldDecorator('productCode', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages.codeRule)
                                        }
                                    ]
                                })(
                                    <RadioGroup>
                                        {
                                            products.map((product, index) =>
                                                <Radio value={product.code} key={index} style={{display: 'block'}}>
                                                    {product.externalName}
                                                    <Popover placement="right" content={product.description}>
                                                        <Icon type="question-circle-o" style={{marginLeft: 6}}/>
                                                    </Popover>
                                                </Radio>
                                            )
                                        }
                                    </RadioGroup>
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
                    activeSuccess && <ModalAlert {...modalAlertProps}/>
                }
            </div>
        );
    }
}

function mapStateToProps({newSubscriberActive}) {
    return {newSubscriberActive};
}

export default injectIntl(connect(mapStateToProps)(Form.create()(NewSubscriberActiveForm)));
