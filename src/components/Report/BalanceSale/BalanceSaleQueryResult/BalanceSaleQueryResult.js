import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Form, Button} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import BalanceSaleList from './BalanceSaleList/BalanceSaleList';
import messages from './messages';
import {dateFormat, numberFormat} from '../../../../utils/util';
import {partnerBalanceSalesType} from '../../../../enums/enums';
import exportData from '../../../../utils/exportData';

class BalanceSaleQueryResult extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        balanceSaleRecords: PropTypes.array.isRequired,
        onExport: PropTypes.func.isRequired,
        onResendMessage: PropTypes.func.isRequired,
        resendMessage: PropTypes.bool.isRequired,
        onBalanceSaleRowSelect: PropTypes.func.isRequired
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
        const {intl, balanceSaleRecords, onExport, resendMessage, onBalanceSaleRowSelect, onResendMessage} = this.props;

        const balanceSaleListProps = {
            balanceSaleRecords,
            onExport,
            resendMessage,
            onRecordSelect(balanceSale){
                onBalanceSaleRowSelect(balanceSale);
            }
        };

        return (
            <div>
                <ContentTitle>
                    <FormattedMessage {...messages.title}/>
                </ContentTitle>
                <div className='buttonGroup'>
                    {/*<Button type="primary" disabled={balanceSaleRecords.length == 0 || !resendMessage}*/}
                            {/*onClick={onResendMessage}>*/}
                        {/*<FormattedMessage {...messages.resendMessage}/>*/}
                    {/*</Button>*/}
                    <Button type="primary" disabled={balanceSaleRecords.length == 0}
                            onClick={this.handleBalanceSaleExport}>
                        <FormattedMessage {...messages.exportButton}/>
                    </Button>
                </div>
                <BalanceSaleList {...balanceSaleListProps}/>
            </div>
        );
    }
}

export default injectIntl(Form.create()(BalanceSaleQueryResult));
