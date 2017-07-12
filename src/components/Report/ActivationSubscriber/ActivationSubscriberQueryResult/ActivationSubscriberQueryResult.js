import React, {Component, PropTypes} from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import ActivationSubscriberList from './ActivationSubscriberList/ActivationSubscriberList';
import exportData from '../../../../utils/exportData';
import {dateFormat, numberFormat} from '../../../../utils/util';
import messages from './messages';
import styles from './index.css';

const activationSubscriberQueryResultPropTypes = {
    activationSubscribers: PropTypes.array.isRequired,
    onExport: PropTypes.func.isRequired
};

function ActivationSubscriberQueryResult({
    activationSubscribers,
    onExport
}) {

    const handleActivationSubscriberExport = ()=>{
        /*
         * jsonData：数据源
         * dataTypes：数据类型
         * filename：导出文件名
         * */
        const exportDatas = activationSubscribers.map(record=>{
            return {
                createInstant: dateFormat(new Date(record.createInstant)),
                smartCardCode: record.smartCardCode,
                stbCode: record.stbCode,
                customerName: record.customerName,
                mobile: record.mobile,
                bouquet: record.bouquet,
                createCode: `${record.createCode} ${record.partnerStaffName}`
            }
        });
        const jsonData = JSON.stringify(exportDatas);
        const dataTypes = {
            "createInstant": "String",
            "smartCardCode": "String",
            "stbCode": "String",
            "customerName": "String",
            "mobile": "String",
            "bouquet": "String",
            "createCode":"String"
        };
        exportData(jsonData, dataTypes, 'activationSubscriberList');
    };

    return (
        <div>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={activationSubscribers.length==0} onClick={handleActivationSubscriberExport}>
                    <FormattedMessage {...messages.exportButton}/>
                </Button>
            </div>
            <ActivationSubscriberList activationSubscribers={activationSubscribers}/>
        </div>
    );
}

ActivationSubscriberQueryResult.propTypes = activationSubscriberQueryResultPropTypes;

export default injectIntl(ActivationSubscriberQueryResult);