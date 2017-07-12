import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import ModalAlert from '../../components/Common/ModalAlert/ModalAlert';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import BalanceSaleSearchForm from '../../components/Report/BalanceSale/BalanceSaleSearchForm/BalanceSaleSearchForm';
import BalanceSaleQueryResult from '../../components/Report/BalanceSale/BalanceSaleQueryResult/BalanceSaleQueryResult';
import messages from './messages';
import {subscriberActiveContent} from './index.css';

const balanceSalePropTypes = {
    balanceSale: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.report}/>,
    <FormattedMessage {...messages.title}/>
];

function BalanceSale({
                         dispatch,
                         balanceSale,
                         login
                     }) {

    const {
        staffs,
        partners,
        resendMessage,
        balanceSaleRecords,
        exportSuccess,
        selectedBalanceSaleRecord,
    } = balanceSale;

    const {isAdmin, partnerId, partnerStaffId} = login;
    console.log(login);

    /*查询表单属性*/
    const searchFormProps = {
        isAdmin,
        staffs,
        partners,
        partnerId,
        partnerStaffId,
        onSearch(values){
            dispatch({
                type: 'balanceSale/queryBalanceSale',
                payload: {
                    ...values
                }
            });
        }
    };


    const queryResultProps = {
        balanceSaleRecords,
        resendMessage,
        selectedBalanceSaleRecord,
        onBalanceSaleRowSelect(record){
            dispatch({
                type: 'balanceSale/selectBalanceSaleRecord',
                payload: {
                    selectedBalanceSaleRecord: record
                }
            });
            if (record.type === 1) {
                dispatch({
                    type: 'balanceSale/changeResendMessageButtonState',
                    payload: {
                        resendMessage: true
                    }
                });
            } else {
                dispatch({
                    type: 'balanceSale/changeResendMessageButtonState',
                    payload: {
                        resendMessage: false
                    }
                });
            }

        },
        onExport(){
            dispatch({
                type: 'balanceSale/doExport',
            });
        },
        onResendMessage(){
            // dispatch({
            //     type: 'balanceSale/resendMessage',
            //     payload: {
            //         selectedBalanceSaleRecord
            //     }
            // });
        }
    };

    const modalAlertProps = {
        title: 'success',
        content: <FormattedMessage {...messages.exportSuccess} />,
        onOk: () => {
            dispatch({
                type: 'balanceSale/hideExportSuccessModal'
            })
        }
    };

    return (
        <div className={subscriberActiveContent}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <BalanceSaleSearchForm {...searchFormProps}/>
                <BalanceSaleQueryResult {...queryResultProps}/>
            </div>
            {
                exportSuccess && <ModalAlert {...modalAlertProps} />
            }
        </div>

    );
}

BalanceSale.propTypes = balanceSalePropTypes;

function mapStateToProps({balanceSale, login}) {
    return {balanceSale, login};
}

export default injectIntl(connect(mapStateToProps)(BalanceSale));
