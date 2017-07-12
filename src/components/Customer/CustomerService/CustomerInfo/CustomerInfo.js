import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import CustomerModal from '../modal/CustomerModal/CustomerModal';
import InfoList from '../InfoList/InfoList';
import {Button} from 'antd';
import messages from './messages';
import styles from './index.css';

const customerInfoPropTypes = {
    customerInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onModifyCustomer: PropTypes.func.isRequired,
};
function CustomerInfo({
    intl,
    customerInfo,
    disabled,
    onModifyCustomer
}) {

    const {
        firstName,
        lastName,
        mobile,
        email,
        saleAreaName,
        fullAddress
    } = customerInfo;

    const infoListProps = {
        infoObject: {
            firstName,
            lastName,
            mobile,
            email,
            saleAreaName,
            fullAddress
        },
        messages
    };

    /*修改客户信息弹窗*/
    const CustomerModalGen = ()=> <CustomerModal />;

    return (
        <div className={styles.serviceInfo}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onModifyCustomer}>
                    <FormattedMessage {...messages.modifyButton}/>
                </Button>
            </div>
            <InfoList {...infoListProps} />
            <CustomerModalGen />
        </div>
    );
}

CustomerInfo.propTypes = customerInfoPropTypes;

export default injectIntl(CustomerInfo);