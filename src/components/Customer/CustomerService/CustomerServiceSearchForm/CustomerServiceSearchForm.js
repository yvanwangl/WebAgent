import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Select, Button} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import {querySubscribersType} from '../../../../enums/enums';
import enumsMessages from '../../../../enums/enumsMessages';
import messages from './messages';
import {formItemHiddenStyle} from '../../../../constants/constants';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const customerServiceSearchFormPropTypes = {
    onSearch: PropTypes.func.isRequired
};

function CustomerServiceSearchForm({
    intl,
    form,
    onSearch
}) {

    const {formatMessage} = intl;
    const {getFieldDecorator} = form;

    const onSubmit = (e)=>{
        e.preventDefault();
        form.validateFields((error, values)=>{
            if(!!error){
                return
            }
            onSearch(values);
        });
    };

    return (
        <div>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <Form layout="inline" className={styles.customerServiceSearchForm} onSubmit={onSubmit}>
                <FormItem>
                    {
                        getFieldDecorator('queryType', {
                            initialValue: 0
                        })(
                            <RadioGroup>
                                {
                                    querySubscribersType.map((type, index)=>
                                        <Radio value={index} key={index}>
                                            <FormattedMessage {...enumsMessages.querySubscribersType[type]}/>
                                        </Radio>
                                    )
                                }
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem hasFeedback>
                    {
                        getFieldDecorator('queryValue', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage(messages.queryValueRule)
                                }
                            ]
                        })(
                            <Input type='text'/>
                        )
                    }
                </FormItem>
                <FormItem style={{textAlign: 'right'}}>
                    <Button type="primary" size="large" htmlType="submit">
                        <FormattedMessage {...messages.queryButton}/>
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}

CustomerServiceSearchForm.propTypes = customerServiceSearchFormPropTypes;

export default injectIntl(Form.create()(CustomerServiceSearchForm));