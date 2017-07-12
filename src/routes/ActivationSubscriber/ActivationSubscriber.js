import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import ModalAlert from '../../components/Common/ModalAlert/ModalAlert';
import ActivationSubscriberSearchForm from '../../components/Report/ActivationSubscriber/ActivationSubscriberSearchForm/ActivationSubscriberSearchForm';
import ActivationSubscriberQueryResult from '../../components/Report/ActivationSubscriber/ActivationSubscriberQueryResult/ActivationSubscriberQueryResult';
import messages from './messages';
import {subscriberActiveContent} from './index.css';

const activationSubscriberPropTypes = {
    activationSubscriber: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.report}/>,
    <FormattedMessage {...messages.title}/>
];

function ActivationSubscriber({
    dispatch,
    activationSubscriber,
    login
}) {
    const {
        staffs,
        bouquets,
        activationSubscribers,
        exportSuccess
    } = activationSubscriber;

    const {isAdmin, partnerStaffId} = login;

    /*查询表单属性*/
    const searchFormProps = {
        isAdmin,
        partnerStaffId,
        staffs,
        bouquets,
        onSearch(values){
            dispatch({
                type: 'activationSubscriber/queryActivationSubscribers',
                payload: {
                    ...values
                }
            })
        }
    };

    const queryResultProps = {
        activationSubscribers,
        onExport(){
            dispatch({
                type: 'activationSubscriber/doExport',
            });
        }
    };

    const modalAlertProps = {
        title: 'success',
        content: <FormattedMessage {...messages.exportSuccess} />,
        onOk: ()=>{
            dispatch({
                type: 'activationSubscriber/hideExportSuccessModal'
            })
        }
    };

    return (
        <div className={subscriberActiveContent}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <ActivationSubscriberSearchForm {...searchFormProps} />
                <ActivationSubscriberQueryResult {...queryResultProps} />
            </div>
            {
                exportSuccess && <ModalAlert {...modalAlertProps} />
            }
        </div>
    );
}

ActivationSubscriber.propTypes = activationSubscriberPropTypes;

function mapStateToProps({activationSubscriber, login}) {
    return {activationSubscriber, login};
}

export default injectIntl(connect(mapStateToProps)(ActivationSubscriber));