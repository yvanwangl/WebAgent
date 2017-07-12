import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Button, Tabs} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import BalanceChangeList from './BalanceChangeList/BalanceChangeList';
import BalanceSaleList from './BalanceSaleList/BalanceSaleList';
import messages from './messages';
import {partnerBalanceSalesType} from '../../../../enums/enums';
import enumsMessages from '../../../../enums/enumsMessages';
import {formItemHiddenStyle} from '../../../../constants/constants';
import {dateFormat, numberFormat} from '../../../../utils/util';
import exportData from '../../../../utils/exportData';
import styles from './index.css';

const TabPane = Tabs.TabPane;

class BalanceChangeQueryResult extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        balanceChangeRecords: PropTypes.array.isRequired,
        balanceSaleRecords: PropTypes.array.isRequired,
        onExport: PropTypes.func.isRequired,
    };

    /*balanceChange 表格导出数据按钮点击事件*/
    handleBalanceChangeExport = ()=>{
        const {balanceChangeRecords} = this.props;
        /*
        * jsonData：数据源
        * dataTypes：数据类型
        * filename：导出文件名
        * */
        const exportDatas = balanceChangeRecords.map(record=>{
            return {
                createInstant: dateFormat(new Date(record.createInstant)),
                amount: numberFormat(record.amount),
                lastAmount: numberFormat(record.lastAmount),
                fromAccountName: record.fromAccountName,
                toAccountName: record.toAccountName,
                createCode: `${record.createCode} ${record.partnerStaffName}`
            }
        });
        const jsonData = JSON.stringify(exportDatas);
        const dataTypes = {
            "createInstant": "String",
            "amount": "Number",
            "lastAmount": "Number",
            "fromAccountName": "String",
            "toAccountName": "String",
            "createCode": "String",
        };
        exportData(jsonData, dataTypes, 'balanceChangeList');
    };

    /*balanceSale 表格导出数据按钮点击事件*/
    handleBalanceSaleExport = ()=>{
        const {balanceSaleRecords} = this.props;
        /*
         * jsonData：数据源
         * dataTypes：数据类型
         * filename：导出文件名
         * */
        const exportDatas = balanceSaleRecords.map(record=>{
            return {
                createInstant: dateFormat(new Date(record.createInstant)),
                money: numberFormat(record.money),
                cardValue: numberFormat(record.cardValue),
                number: record.number,
                mobile: record.mobile,
                type: partnerBalanceSalesType[record.type],
                createCode: `${record.createCode} ${record.partnerStaffName}`
            }
        });
        const jsonData = JSON.stringify(exportDatas);
        const dataTypes = {
            "createInstant": "String",
            "money": "Number",
            "cardValue": "Number",
            "number": "Number",
            "mobile": "String",
            "type": "String",
            "createCode": "String",
        };
        exportData(jsonData, dataTypes, 'balanceSaleList');
    };

    render() {
        const {
            intl,
            balanceChangeRecords,
            balanceSaleRecords,
            onExport
        } = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={formatMessage(messages.intoOutTab)} key="1">
                        <div className='buttonGroup'>
                            <Button type="primary" disabled={balanceChangeRecords.length==0} onClick={this.handleBalanceChangeExport}>
                                <FormattedMessage {...messages.exportButton}/>
                            </Button>
                        </div>
                        <BalanceChangeList balanceChangeRecords={balanceChangeRecords}/>
                    </TabPane>
                    <TabPane tab={formatMessage(messages.salesTab)} key="2">
                        <div className='buttonGroup'>
                            <Button type="primary" disabled={balanceSaleRecords.length==0} onClick={this.handleBalanceSaleExport}>
                                <FormattedMessage {...messages.exportButton}/>
                            </Button>
                        </div>
                        <BalanceSaleList balanceSaleRecords={balanceSaleRecords} onExport={onExport}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default injectIntl(BalanceChangeQueryResult);