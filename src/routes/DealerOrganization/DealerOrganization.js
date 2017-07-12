import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import OrganizationTreeGrid from '../../components/Dealer/DealerOrganization/OrganizationTreeGrid/OrganizationTreeGrid';
import OrganizationInfo from '../../components/Dealer/DealerOrganization/OrganizationInfo/OrganizationInfo';
import OrganizationStock from '../../components/Dealer/DealerOrganization/OrganizationStock/OrganizationStock';
import OrganizationStaff from '../../components/Dealer/DealerOrganization/OrganizationStaff/OrganizationStaff';
import messages from './messages';
import styles from './index.css';

const dealerOrganizationPropTypes = {
    dealerOrganization: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.dealer}/>,
    <FormattedMessage {...messages.title}/>
];

function DealerOrganization({
    intl,
    dispatch,
    dealerOrganization
}) {

    const {formatMessage} = intl;

    /*组织对象数据解构*/
    const {
        treeGridNodes,
        currentItem,
        organizationInfo,
        disabled,
        editorVisible,
        editorType,
        errorMessage,
    } = dealerOrganization;

    /*组织树属性*/
    const organizationTreeGridProps = {
        treeGridNodes,
        currentItem: currentItem || {},
        onRowSelect(selectKey){
            dispatch({
                type:'dealerOrganization/nodeSelect',
                payload: {
                    selectKey
                }
            });
            dispatch({
                type:'organizationStaff/nodeSelect',
                payload: {
                    selectKey
                }
            });
            dispatch({
                type:'organizationStock/nodeSelect',
                payload: {
                    selectKey
                }
            });
        }
    };

    /*组织信息属性*/
    const organizationInfoProps = {
        dispatch,
        organizationInfo,
        disabled,
        editorVisible,
        editorType,
        currentItem: currentItem || {},
        onAdd(){
            dispatch({
                type:'dealerOrganization/showEditor',
                editorType: 'create'
            });
        },
        onModify(){
            dispatch({
                type:'dealerOrganization/showEditor',
                editorType: 'modify'
            });
        },
        onRecharge(){
            dispatch({
                type:'recharge/showRechargeModal',
                payload: {
                    rechargeInType: 0,      /*充值类型：组织*/
                    rechargeInId: currentItem.id,
                    rechargeInName: currentItem.name,
                    rechargeInBalance: currentItem.balance,
                    editorType: 'organization',
                    titleType: 'organization'
                }
            });
        }
    };

    /*错误信息提示弹窗*/
    const displayError = () => {
        message.error(formatMessage(messages.errorMessage[errorMessage]));
        dispatch({
            type: 'dealerOrganization/resetErrorMessage'
        });
    };

    return (
        <div>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                {/*组织信息树表*/}
                <OrganizationInfo {...organizationInfoProps}>
                    {
                        treeGridNodes.length>0 && <OrganizationTreeGrid {...organizationTreeGridProps}/>
                    }
                </OrganizationInfo>
                {/*组织仓库信息*/}
                <OrganizationStock />
                {/*组织人员*/}
                <OrganizationStaff />
            </div>
            {
                errorMessage && displayError()
            }
        </div>
    );
}

DealerOrganization.propTypes = dealerOrganizationPropTypes;

function mapStateToProps({ dealerOrganization }) {
    return {dealerOrganization};
}

export default injectIntl(connect(mapStateToProps)(DealerOrganization));