import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import SubDealers from '../../components/Dealer/SubDealer/SubDealers/SubDealers';
import SubDealerStock from '../../components/Dealer/SubDealer/SubDealerStock/SubDealerStock';
import messages from './messages';
import styles from './index.css';

const subDealerPropTypes = {
    subDealer: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.dealer}/>,
    <FormattedMessage {...messages.title}/>
];

function SubDealer({
    dispatch,
    subDealer
}) {

    /*组织对象数据解构*/
    const {
        disabled,
        subDealers,
        stockList,
        currentPartner
    } = subDealer;

    /*下级代理商列表属性*/
    const subDealersProps = {
        disabled,
        subDealers,
        currentPartner,
        onSubDealerSelect(subDealerRecord){
            dispatch({
                type:'subDealer/onSubDealerSelect',
                payload: {
                    subDealerRecord
                }
            });
        },
        onRecharge(){
            dispatch({
                type:'recharge/showRechargeModal',
                payload: {
                    rechargeInType: 0,      /*充值类型：组织*/
                    rechargeInId: currentPartner.organizationId,
                    rechargeInName: currentPartner.partnerName,
                    rechargeInBalance: currentPartner.balance,
                    editorType: 'organization',
                    titleType: 'subDealer'
                }
            });
        }
    };

    /*下级代理商仓库列表属性*/
    const subDealerStocksProps = {
        dispatch,
        stockList,
        disabled,
        currentPartner
    };

    return (
        <div>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                {/*下级代理商列表*/}
                <SubDealers {...subDealersProps}/>
                {/*下级代理商仓库信息*/}
                <SubDealerStock {...subDealerStocksProps}/>
            </div>
        </div>
    );
}

SubDealer.propTypes = subDealerPropTypes;

function mapStateToProps({ subDealer }) {
    return { subDealer };
}

export default injectIntl(connect(mapStateToProps)(SubDealer));