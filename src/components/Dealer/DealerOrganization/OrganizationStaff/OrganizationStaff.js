import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import StaffList from './StaffList/StaffList';
import StaffModal from './StaffModal/StaffModal';
import RechargeModal from '../RechargeModal/RechargeModal';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import {Button, message} from 'antd';
import messages from './messages';
import styles from './index.css';

const organizationStaffPropTypes = {
    currentOrganization: PropTypes.object.isRequired,
    organizationStaff: PropTypes.object.isRequired
};
function OrganizationStaff({
    intl,
    dispatch,
    currentOrganization,
    organizationStaff,
}) {

    const {formatMessage} = intl;

    const {
        id: organizationId,
        name: organizationName
    } = currentOrganization;

    /*组织员工对象数据解构*/
    const {
        staffList,
        addButtonDisabled,
        disabled,
        editorType,
        editorVisible,
        currentItem,
        organizationChange,
        telConfig
    } = organizationStaff;

    /*增加员工*/
    const onAdd = ()=>{
        dispatch({
            type:'organizationStaff/showEditor',
            payload: {
                editorType: 'create'
            }
        });
    };

    /*修改员工*/
    const onModify = ()=>{
        dispatch({
            type:'organizationStaff/showEditor',
            payload: {
                editorType: 'modify'
            }
        });
    };

    /*员工充值*/
    const onRecharge = ()=>{
        let rechargeId = '';
        switch (currentItem.usedAccountType) {
            case 0:
                rechargeId = currentItem.id;
                break;
            case 1:
                rechargeId = currentItem.partnerOrganizationId;
                break;
            case 2:
                rechargeId = currentItem.partnerAccountId;
                break;
        }
        dispatch({
            type:'recharge/showRechargeModal',
            payload: {
                rechargeInType: currentItem.usedAccountType,
                rechargeInId: rechargeId,
                rechargeInName: currentItem.name,
                rechargeInBalance: currentItem.balance,
                editorType: 'staff',
                titleType: 'staff',
                staffId: currentItem.id
            }
        });
    };

    /*组织员工列表属性*/
    const staffListProps = {
        staffList,
        organizationChange,
        resetOrganizationChange(){
            dispatch({
                type:'organizationStaff/resetOrganizationChange'
            });
        },
        onRecordSelect(staff){
            dispatch({
                type:'organizationStaff/staffSelect',
                staff
            });
        }
    };

    /*组织员工编辑弹窗属性*/
    const staffModalProps = {
        organizationId,
        organizationName,
        editorType,
        telConfig,
        editorVisible,
        currentItem,
        onConfirm(staff){
            dispatch({
                type:`organizationStaff/${editorType}`,
                payload: {...staff}
            });
        },
        onCancel(){
            dispatch({
                type:'organizationStaff/hideEditor'
            });
        }
    };

    /*生成 员工编辑弹窗*/
    const StaffModalGen = ()=><StaffModal {...staffModalProps}/>;

    /*生成 员工充值弹窗*/
    const RechargeModalGen = ()=> <RechargeModal />;

    return (
        <div className={styles.organizationStaff}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={addButtonDisabled} onClick={onAdd}>
                    <FormattedMessage {...messages.addButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onModify}>
                    <FormattedMessage {...messages.modifyButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onRecharge}>
                    <FormattedMessage {...messages.rechargeButton}/>
                </Button>
            </div>
            <StaffList {...staffListProps}/>
            <StaffModalGen />
            <RechargeModalGen />
        </div>
    );
}

OrganizationStaff.propTypes = organizationStaffPropTypes;

function mapStateToProps({dealerOrganization, organizationStaff}) {
    return {
        currentOrganization: dealerOrganization.currentItem || {},
        organizationStaff
    };
}

export default injectIntl(connect(mapStateToProps)(OrganizationStaff));
