import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Select, Button, Row, Col, DatePicker} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import {formItemHiddenStyle} from '../../../../constants/constants';
import {dateFormat} from '../../../../utils/util';
import messages from './messages';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

class ActivationSubscriberSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDateItem: null,
            dates: []
        };
    }

    static propTypes = {
        staffs: PropTypes.array.isRequired,
        bouquets: PropTypes.array.isRequired,
        onSearch: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool,
        partnerStaffId: PropTypes.any
    };

    /*查询按钮点击事件*/
    handleSubmit = (e)=>{
        const {form, onSearch} = this.props;
        const {dates} = this.state;
        if(dates.length==0){
            dates[0]=dateFormat(new Date());
            dates[1]=dateFormat(new Date());
        }
        e.preventDefault();
        form.validateFields((error, values)=>{
            if(!!error){
                return;
            }
            /*对日期选项进行数据转换：YY-MM-dd*/
            let minCreateInstant = '';
            let maxCreateInstant = '';
            switch (values.date) {
                //当天
                case 0:
                    minCreateInstant = dateFormat(new Date());
                    maxCreateInstant = dateFormat(new Date());
                    break;
                //上一周
                case 1:
                    minCreateInstant = dateFormat(new Date(new Date().getTime()-6*24*3600*1000));
                    maxCreateInstant = dateFormat(new Date());
                    break;
                //上一个月
                case 2:
                    minCreateInstant = dateFormat(new Date(new Date().getTime()-29*24*3600*1000));
                    maxCreateInstant = dateFormat(new Date());
                    break;
                //其他
                case 3:
                    minCreateInstant = dates[0];
                    maxCreateInstant = dates[1];
                    break;
            }
            values['minCreateInstant'] = minCreateInstant;
            values['maxCreateInstant'] = maxCreateInstant;
            onSearch(values);
        })
    };

    /*重置按钮点击事件*/
    handleReset = ()=>{
        const {form} = this.props;
        form.resetFields();
        this.setState({
            selectDateItem: null,
            dates: []
        });
    };

    /*日期选择组件变更事件*/
    handleRangePickerChange = (dates, dateStrings)=>{
        this.setState({
            dates: dateStrings
        });
    };

    /*事件选择单选组变更事件*/
    handleDateItemChange = (e)=>{
        this.setState({
            selectDateItem: e.target.value
        });
    };

    render() {
        const {intl, form, isAdmin, partnerStaffId, staffs, bouquets} = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        const {selectDateItem} = this.state;

        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Form className={styles.activationSubscriberSearchForm} onSubmit={this.handleSubmit}>
                    <Row gutter={40}>
                        <Col span={12} key={0}>
                            <FormItem
                                label={formatMessage(messages.saler)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('partnerStaffId', {
                                        initialValue: partnerStaffId
                                    })(
                                        <Select
                                            showSearch
                                            disabled={!isAdmin}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {
                                                staffs.map(({id, name, code}, index) => (
                                                    <Option value={id} key={id}>{`${code} ${name}`}</Option>
                                                ))
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={1}>
                            <FormItem
                                label={formatMessage(messages.date)}
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('date', {
                                        initialValue: 0,
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage(messages.dateRule)
                                            }
                                        ]
                                    })(
                                        <RadioGroup onChange={this.handleDateItemChange}>
                                            <Radio value={0} key={0}>
                                                <FormattedMessage {...messages.dateItem.today}/>
                                            </Radio>
                                            <Radio value={1} key={1}>
                                                <FormattedMessage {...messages.dateItem.latestWeek}/>
                                            </Radio>
                                            <Radio value={2} key={2}>
                                                <FormattedMessage {...messages.dateItem.latestMonth}/>
                                            </Radio>
                                            <Radio value={3} key={3}>
                                                <FormattedMessage {...messages.dateItem.other}/>
                                                <span style={{display:'inline-block', width:10}}></span>
                                                {
                                                    selectDateItem==3 &&
                                                    <RangePicker
                                                        style={{width:200}}
                                                        onChange={this.handleRangePickerChange}
                                                        disabledTime={(dates, partial)=>{
                                                            console.log(dates, partial);
                                                        }}
                                                    />
                                                }
                                            </Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={2}>
                            <FormItem
                                label={formatMessage(messages.bouquet)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('displayNames')(
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                        >
                                            {
                                                bouquets.map(({id, displayName}, index) => (
                                                    <Option key={displayName}>{displayName}</Option>
                                                ))
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={3}>
                            <FormItem
                                label={formatMessage(messages.smartCardCode)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('smartCardCode', {
                                        initialValue: ''
                                    })(
                                        <Input type='text'/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={4}>
                            <FormItem
                                label={formatMessage(messages.stbCode)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('stbCode', {
                                        initialValue: ''
                                    })(
                                        <Input type='text'/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                style={{marginRight: 10}}
                            >
                                <FormattedMessage {...messages.queryButton}/>
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={this.handleReset}
                            >
                                <FormattedMessage {...messages.resetButton}/>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default injectIntl(Form.create()(ActivationSubscriberSearchForm));