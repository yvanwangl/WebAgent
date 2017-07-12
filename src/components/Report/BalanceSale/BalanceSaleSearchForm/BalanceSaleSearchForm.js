import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Input, Radio, Select, Button, Row, Col, DatePicker} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import messages from './messages';
import {dateFormat} from '../../../../utils/util';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {RangePicker} = DatePicker;

const balanceSaleSearchFormPropTypes = {
    //c: PropTypes.object.isRequired
};

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
};

class BalanceSaleSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDateItem: null,
            dates: []
        };
    }

    static propTypes = {
        partners: PropTypes.array.isRequired,
        staffs: PropTypes.array.isRequired,
        onSearch: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool,
        partnerId: PropTypes.any
    };

    /*查询按钮点击事件*/
    handleSubmit = (e) => {
        const {form, onSearch} = this.props;
        const {dates} = this.state;
        if(dates.length==0){
            dates[0]=dateFormat(new Date());
            dates[1]=dateFormat(new Date());
        }
        e.preventDefault();
        form.validateFields((error, values) => {
            if (!!error) {
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
                    minCreateInstant = dateFormat(new Date(new Date().getTime() - 6 * 24 * 3600 * 1000));
                    maxCreateInstant = dateFormat(new Date());
                    break;
                //上一个月
                case 2:
                    minCreateInstant = dateFormat(new Date(new Date().getTime() - 29 * 24 * 3600 * 1000));
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
            if (values['userId'] === -1) {
                delete values.userId
            }
            onSearch(values);
        })
    };

    /*重置按钮点击事件*/
    handleReset = () => {
        const {form} = this.props;
        form.resetFields();
        this.setState({
            selectDateItem: null,
            dates: [],
            disabledSmartCardInput: false
        });
    };


    /*日期选择组件变更事件*/
    handleRangePickerChange = (dates, dateStrings) => {
        this.setState({
            dates: dateStrings
        });
    };

    /*事件选择单选组变更事件*/
    handleDateItemChange = (e) => {
        this.setState({
            selectDateItem: e.target.value
        });
    };

    render() {
        const {intl, form, isAdmin, partners, staffs, partnerStaffId, partnerId} = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator, getFieldValue} = form;
        const {selectDateItem} = this.state;
        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Form className={styles.balanceSaleSearchForm} onSubmit={this.handleSubmit}>
                    <Row gutter={40}>
                        <Col span={12} key={0}>
                            <FormItem
                                label={formatMessage(messages.partnerName)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('partnerId', {
                                        initialValue: partnerId,
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage(messages.partnerNameRule)
                                            }
                                        ]
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {
                                                partners.map(({partnerId, partnerName, partnerCode}, index) => (
                                                    <Option value={partnerId}
                                                            key={partnerId}>{`${partnerCode} ${partnerName}`}</Option>
                                                ))
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={1}>
                            <FormItem
                                label={formatMessage(messages.saler)}
                                {...formItemLayout}
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('userId', {
                                        initialValue: getFieldValue('partnerId') === partnerId ? (isAdmin ? -1 : partnerStaffId) : -1
                                    })(
                                        <Select
                                            showSearch
                                            disabled={!isAdmin || getFieldValue('partnerId') !== partnerId }
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option key={-1} value={-1}>ALL</Option>
                                            {
                                                staffs.map(({userId, name, code}, index) => (
                                                    <Option value={userId} key={userId}>{`${code} ${name}`}</Option>
                                                ))
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={2}>
                            <FormItem label={formatMessage(messages.saleType)}
                                      {...formItemLayout}
                                      hasFeedback
                            >
                                {
                                    getFieldDecorator('eventType', {
                                        initialValue: 0,
                                        rules: [
                                            {
                                                required: true
                                            }
                                        ]
                                    })(
                                        <Select>
                                            <Option value={0}>{formatMessage(messages.saleTypeAll)}</Option>
                                            <Option value={2}>{formatMessage(messages.saleTypeRemoteTopUp)}</Option>
                                            <Option value={1}>{formatMessage(messages.saleTypeVoucherCard)}</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={3}>
                            <FormItem label={formatMessage(messages.mobile)}
                                      {...formItemLayout}
                                      hasFeedback
                            >
                                {
                                    getFieldDecorator('mobile')(
                                        <Input type='text'/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={4}>
                            <FormItem label={formatMessage(messages.smartCardCode)}
                                      {...formItemLayout}
                                      hasFeedback
                            >
                                {
                                    getFieldDecorator('cardNumber')(
                                        <Input type='text'
                                               disabled={getFieldValue("eventType") === 1}/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={12} key={5}>
                            <FormItem
                                label={formatMessage(messages.date)}
                                {...formItemLayout}
                                hasFeedback
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
                                                <span style={{display: 'inline-block', width: 10}}></span>
                                                {
                                                    selectDateItem == 3 &&
                                                    <RangePicker
                                                        style={{width: 200}}
                                                        onChange={this.handleRangePickerChange}
                                                        disabledTime={(dates, partial) => {
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
                    </Row>

                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
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

BalanceSaleSearchForm.propTypes = balanceSaleSearchFormPropTypes;

export default injectIntl(Form.create()(BalanceSaleSearchForm));
