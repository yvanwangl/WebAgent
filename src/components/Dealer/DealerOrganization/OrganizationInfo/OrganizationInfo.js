import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import OrganizationTreeGrid from '../OrganizationTreeGrid/OrganizationTreeGrid';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import OrganizationModal from '../OrganizationModal/OrganizationModal';
import RechargeModal from '../RechargeModal/RechargeModal';
import {Button} from 'antd';
import messages from './messages';
import styles from './index.css';

const organizationInfoPropTypes = {
    organizationInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired
};

function OrganizationInfo({
    dispatch,
    children,
    disabled,
    editorVisible,
    editorType,
    currentItem,
    onAdd,
    onModify,
    onRecharge
}) {

    /*编辑组织弹窗 属性*/
    const organizationModalProps = {
        editorType,
        editorVisible,
        currentItem,
        onConfirm(organization){
            dispatch({
                type:`dealerOrganization/${editorType}`,
                payload: {...organization}
            });
        },
        onCancel(){
            dispatch({
                type:'dealerOrganization/hideEditor'
            });
        }
    };

    /*生成 编辑组织弹窗*/
    const OrganizationModalGen = () => <OrganizationModal {...organizationModalProps}/>;

    /*生成 组织充值弹窗*/
    const RechargeModalGen = () => <RechargeModal />;

    return (
        <div className={styles.organizationInfo}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onAdd}>
                    <FormattedMessage {...messages.addButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onModify}>
                    <FormattedMessage {...messages.modifyButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onRecharge}>
                    <FormattedMessage {...messages.rechargeButton}/>
                </Button>
            </div>
            {children}
            <OrganizationModalGen />
            <RechargeModalGen />
        </div>
    );
}

OrganizationInfo.propTypes = organizationInfoPropTypes;

export default injectIntl(OrganizationInfo);