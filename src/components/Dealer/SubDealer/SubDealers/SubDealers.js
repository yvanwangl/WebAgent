import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import SubDealerList from './SubDealerList/SubDealerList';
import RechargeModal from '../../DealerOrganization/RechargeModal/RechargeModal';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import {Button, message} from 'antd';
import messages from './messages';
import styles from './index.css';

const organizationStaffPropTypes = {
    subDealers: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    onRecharge: PropTypes.func.isRequired,
};
function SubDealers({
    intl,
    currentPartner,
    subDealers,
    disabled,
    onSubDealerSelect,
    onRecharge
}) {

    /*生成 代理商组织充值弹窗*/
    const RechargeModalGen = ()=> <RechargeModal />;

    return (
        <div className={styles.subDealers}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onRecharge}>
                    <FormattedMessage {...messages.rechargeButton}/>
                </Button>
            </div>
            <SubDealerList
                currentPartner={currentPartner}
                subDealers={subDealers}
                onSubDealerSelect={onSubDealerSelect}
            />
            <RechargeModalGen />
        </div>
    );
}

SubDealers.propTypes = organizationStaffPropTypes;

export default injectIntl(SubDealers);
