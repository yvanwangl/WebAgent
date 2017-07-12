import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, TreeSelect,Input, Radio, Select, Button, Row, Col, DatePicker} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import messages from './messages';
import {dateFormat} from '../../../../utils/util';
import {formItemHiddenStyle} from '../../../../constants/constants';
import styles from './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {RangePicker} = DatePicker;

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

class BalanceChangeSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectPartnerId: null,
            selectDateItem: null,
            dates: []
        };
    }

    static propTypes = {
        partners: PropTypes.array.isRequired,
        organizationStaffTreeNodes: PropTypes.array.isRequired,
        onPartnerSelect: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool,
        userId: PropTypes.any,
        partnerId: PropTypes.any,
    };

    /*默认选中当前代理商*/
    componentWillReceiveProps(nextProps){
        const {partnerId} = nextProps;
        //默认加载当前合作伙伴时执行一次账户查询事件
        if(this.state.selectPartnerId==null){
            this.setState({
                selectPartnerId: partnerId
            }, ()=> {
                if(this.state.selectPartnerId!=null){
                    this.handlePartnerSelect(this.state.selectPartnerId);
                }
            });
        }
    }

    /*格式化组织-人员账户树 节点*/
    treeNodesGen = (organizationTreeNodes) => {
        let treeNodes = [];
        /*数据格式化之前进行数据深度拷贝，避免重复渲染导致的引用重复增加*/
        let orgTreeNodes = organizationTreeNodes.map(node => Object.assign({}, node, {children: []}));
        for (let node of orgTreeNodes) {
            node['value'] = `${node.key}`;
            /*根节点渲染为：Dealer:*/
            let nodeCode = node.code == null ? '' : `${node.code} `;
            if (node.parentId == null) {
                node['label'] = `Dealer: ${nodeCode}${node.name}`;
            } else {
                /*节点类型为组织(type=0)，渲染为：Org:*/
                if (node.type == 0) {
                    node['label'] = `Org: ${nodeCode}${node.name}`;
                } else {
                    node['label'] = `Saler: ${nodeCode}${node.name}`;
                }
            }
            if (node.parentkey == null || node.parentkey == undefined) {
                treeNodes.push(node);
            } else {
                for (let n of orgTreeNodes) {
                    if (node.parentkey == n.key) {
                        n.children.push(node);
                    }
                }
            }
        }
        return treeNodes;
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
            onSearch(values);
        })
    };

    /*重置按钮点击事件*/
    handleReset = () => {
        const {form} = this.props;
        form.resetFields();
        this.setState({
            selectDateItem: null,
            dates: []
        });
    };

    /*代理商下拉框选择事件*/
    handlePartnerSelect = (value) => {
        const {form, onPartnerSelect} = this.props;
        this.setState({
            selectPartnerId: value
        });
        form.setFieldsValue({
            partnerAccountId: '',
            partnerAccountKey: ''
        });
        onPartnerSelect(value);
    };

    /*转出账户选择事件*/
    handleAccountTreeSelectChange = (value) => {
        const {form, organizationStaffTreeNodes} = this.props;
        let targetNode = organizationStaffTreeNodes.filter(node => node.key == value)[0];
        form.setFieldsValue({
            partnerAccountId: targetNode.partnerAccountId
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
        const {
            intl,
            form,
            isAdmin,
            partners,
            partnerId,
            organizationStaffTreeNodes
        } = this.props;
        const {formatMessage} = intl;
        const {getFieldDecorator} = form;
        const {selectDateItem} = this.state;
        const treeNodes = this.treeNodesGen(organizationStaffTreeNodes);

        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Form className={styles.balanceChangeSearchForm} onSubmit={this.handleSubmit}>
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
                                            onSelect={this.handlePartnerSelect}
                                            disabled={!isAdmin}
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
                        <Col span={12} key={2}>
                            <FormItem style={formItemHiddenStyle}>
                                {
                                    getFieldDecorator('partnerAccountId', {
                                        initialValue: ''
                                    })(
                                        <Input type="hidden"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label={formatMessage(messages.partnerAccountName)}
                                      hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('partnerAccountKey', {
                                        initialValue: ''
                                    })(
                                        <TreeSelect
                                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                            treeData={treeNodes}
                                            placeholder="Please select"
                                            treeDefaultExpandAll
                                            onChange={this.handleAccountTreeSelectChange}
                                        />
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
                                                <span style={{display: 'inline-block', width: 10}}></span>
                                                {
                                                    selectDateItem == 3 && <RangePicker style={{width: 200}}
                                                                                        onChange={this.handleRangePickerChange}/>
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

export default injectIntl(Form.create()(BalanceChangeSearchForm));