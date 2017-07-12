import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message, Modal} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import ModalAlert from '../../components/Common/ModalAlert/ModalAlert';
import CustomerServiceSearchForm from '../../components/Customer/CustomerService/CustomerServiceSearchForm/CustomerServiceSearchForm';
import SubscriberSelectModal from '../../components/Customer/CustomerService/modal/SubscriberSelectModal/SubscriberSelectModal';
import ServiceInfo from '../../components/Customer/CustomerService/ServiceInfo/ServiceInfo';
import CustomerInfo from '../../components/Customer/CustomerService/CustomerInfo/CustomerInfo';
import messages from './messages';
import {subscriberActiveContent} from './index.css';

const customerServicePropTypes = {
    customerService: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.customer}/>,
    <FormattedMessage {...messages.title}/>
];

function CustomerService({
    intl,
    dispatch,
    customerService
}) {

    const {
        subscribers,
        nullSubscribersModalShow,
        editorVisible,
        serviceInfo,
        customerInfo,
        disabledButton,
        errorLevel,
        errorCode
    } = customerService;

    /*查询按钮点击事件*/
    const onSearch = (values)=>{
        dispatch({
            type: 'customerService/querySubscribers',
            payload: {
                ...values
            }
        })
    };

    /*选择用户弹窗属性*/
    const subscriberSelectModalProps = {
        editorVisible,
        subscribers,
        onSubscriberSelect(subscriberId){
            dispatch({
                type: 'customerService/querySubscriberInfo',
                payload: {
                    subscriberId
                }
            });
        },
        onCancel(){
            dispatch({
                type: 'customerService/hideModal'
            });
        }
    };

    /*服务信息模块 属性*/
    const serviceInfoProps = {
        serviceInfo,
        disabled: disabledButton,
        /*充值按钮点击事件*/
        onRecharge(){
            dispatch({
                type: 'customerServiceRecharge/showModal'
            });
        },
        /*更换包按钮点击事件*/
        onChangeBouquet(){
            dispatch({
                type: 'customerServiceChangeBouquet/showModal'
            });
        },
        /*更换卡按钮点击事件*/
        onChangeCard(){
            dispatch({
                type: 'customerServiceChangeCard/showModal'
            });
        },
        /*更换卡按钮点击事件*/
        onRefreshAuth(){
            dispatch({
                type: 'customerServiceRefreshAuth/showModal'
            });
        },
    };

    /*客户信息模块 属性*/
    const customerInfoProps = {
        customerInfo,
        disabled: disabledButton,
        /*修改客户信息按钮点击事件*/
        onModifyCustomer(){
            dispatch({
                type: 'customerServiceCustomer/showModal',
                payload: {
                    customerInfo
                }
            });
        }
    };

    /*没有查询到用户则弹窗提示*/
    const nullSubscribersModalAlertProps = {
        type: 'info',
        title: <FormattedMessage {...messages.nullSubscribersTitle}/>,
        content: <FormattedMessage {...messages.nullSubscribersContent}/>,
        onOk() {
            dispatch({
                type: 'customerService/hideNullSubscribersModal'
            })
        },
    };

    /*查询到多个客户则弹窗提示*/
    const moreCustomersModalAlertProps = {
        type: errorLevel.toLowerCase(),
        title: <FormattedMessage {...messages.errorCodeTitle}/>,
        content: <FormattedMessage {...messages.errorCode['data.one.more']}/>,
        onOk() {
            dispatch({
                type: 'customerService/resetErrorCode'
            })
        },
    };

    /*选择用户弹窗*/
    const SubscriberSelectModalGen = ()=> <SubscriberSelectModal {...subscriberSelectModalProps}/>;

    return (
        <div className={subscriberActiveContent}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <CustomerServiceSearchForm onSearch={onSearch}/>
                <SubscriberSelectModalGen />
                <ServiceInfo {...serviceInfoProps}/>
                <CustomerInfo {...customerInfoProps}/>
            </div>
            {
                nullSubscribersModalShow && <ModalAlert {...nullSubscribersModalAlertProps}/>
            }
            {
                errorCode!='' && <ModalAlert {...moreCustomersModalAlertProps}/>
            }
        </div>
    );
}

CustomerService.propTypes = customerServicePropTypes;

function mapStateToProps({customerService}) {
    return {customerService};
}

export default injectIntl(connect(mapStateToProps)(CustomerService));