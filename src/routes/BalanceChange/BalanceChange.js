import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import ModalAlert from '../../components/Common/ModalAlert/ModalAlert';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import BalanceChangeSearchForm from '../../components/Report/BalanceChange/BalanceChangeSearchForm/BalanceChangeSearchForm';
import BalanceChangeQueryResult from '../../components/Report/BalanceChange/BalanceChangeQueryResult/BalanceChangeQueryResult';
import messages from './messages';
import {subscriberActiveContent} from './index.css';

const balanceChangeServicePropTypes = {
    balanceChange: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.report}/>,
    <FormattedMessage {...messages.title}/>
];

function BalanceChange({
    dispatch,
    balanceChange,
    login
}) {

    const {
        partners,
        organizationStaffTreeNodes,
        balanceChangeRecords,
        balanceSaleRecords,
        exportSuccess
    } = balanceChange;

    const {isAdmin, userId, partnerId} = login;

    /*查询表单属性*/
    const searchFormProps = {
        isAdmin,
        userId,
        partners,
        partnerId,
        organizationStaffTreeNodes,
        onPartnerSelect(partnerId){
            dispatch({
                type: 'balanceChange/getAccountTreeNodes',
                payload: {
                    partnerId
                }
            })
        },
        onSearch(values){
            dispatch({
                type: 'balanceChange/queryBalanceChange',
                payload: {
                    ...values
                }
            })
        }
    };

    const queryResultProps = {
        balanceChangeRecords,
        balanceSaleRecords,
        onExport(exportType){
            dispatch({
                type: 'balanceChange/doExport',
                payload: {
                    exportType
                }
            });
        }
    };

    const modalAlertProps = {
        title: 'success',
        content: <FormattedMessage {...messages.exportSuccess} />,
        onOk: ()=>{
            dispatch({
                type: 'balanceChange/hideExportSuccessModal'
            })
        }
    };

    return (
        <div className={subscriberActiveContent}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <BalanceChangeSearchForm {...searchFormProps} />
                <BalanceChangeQueryResult {...queryResultProps} />
            </div>
            {
                exportSuccess && <ModalAlert {...modalAlertProps} />
            }
        </div>
    );
}

BalanceChange.propTypes = balanceChangeServicePropTypes;

function mapStateToProps({balanceChange, login}) {
    return {balanceChange, login};
}

export default injectIntl(connect(mapStateToProps)(BalanceChange));