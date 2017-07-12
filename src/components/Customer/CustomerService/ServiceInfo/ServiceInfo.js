import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import InfoList from '../InfoList/InfoList';
import RechargeModal from '../modal/RechargeModal/RechargeModal';
import ChangeBouquetModal from '../modal/ChangeBouquetModal/ChangeBouquetModal';
import ChangeCardModal from '../modal/ChangeCardModal/ChangeCardModal';
import RefreshAuthModal from '../modal/RefreshAuthModal/RefreshAuthModal';
import {Button} from 'antd';
import messages from './messages';
import styles from './index.css';

const serviceInfoPropTypes = {
    serviceInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onRecharge: PropTypes.func.isRequired,
    onChangeBouquet: PropTypes.func.isRequired,
    onChangeCard: PropTypes.func.isRequired,
    onRefreshAuth: PropTypes.func.isRequired,
};
function ServiceInfo({
    intl,
    serviceInfo,
    disabled,
    onRecharge,
    onChangeBouquet,
    onChangeCard,
    onRefreshAuth
}) {

    const infoListProps = {
        infoObject: serviceInfo,
        messages
    };

    /*充值弹窗*/
    const RechargeModalGen = ()=> <RechargeModal />;

    /*更换包弹窗*/
    const ChangeBouquetModalGen = ()=> <ChangeBouquetModal />;

    /*更换物理资源弹窗*/
    const ChangeCardModalGen = ()=> <ChangeCardModal />;

    /*刷新授权弹窗*/
    const RefreshAuthModalGen = ()=> <RefreshAuthModal />;

    return (
        <div className={styles.serviceInfo}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onRecharge}>
                    <FormattedMessage {...messages.rechargeButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onChangeBouquet}>
                    <FormattedMessage {...messages.changeBouquetButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onChangeCard}>
                    <FormattedMessage {...messages.changeCardButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onRefreshAuth}>
                    <FormattedMessage {...messages.refreshAuthButton}/>
                </Button>
            </div>
            <InfoList {...infoListProps} />
            <RechargeModalGen />
            <ChangeBouquetModalGen />
            <ChangeCardModalGen />
            <RefreshAuthModalGen />
        </div>
    );
}

ServiceInfo.propTypes = serviceInfoPropTypes;

export default injectIntl(ServiceInfo);