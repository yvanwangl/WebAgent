import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import StockList from './StockList/StockList';
import StockModal from './StockModal/StockModal';
import TransferModal from './TransferModal/TransferModal';
import messages from './messages';
import styles from './index.css';

const organizationStockPropTypes = {
    currentOrganization: PropTypes.object.isRequired,
    organizationStock: PropTypes.object.isRequired
};
function OrganizationStock({
    intl,
    dispatch,
    currentOrganization,
    organizationStock,
}) {

    const {
        id: organizationId,
        name: organizationName
    } = currentOrganization;

    /*组织仓库对象数据解构*/
    const {
        stockList,
        disabled
    } = organizationStock;

    /*修改仓库信息*/
    const onModify = ()=>{
        dispatch({
            type:'modifyOrganizationStock/showModifyEditor'
        });
    };

    /*仓库调拨*/
    const onTransfer = ()=>{
        dispatch({
            type:'transferOrganizationStock/showTransferEditor'
        });
    };

    /*生成 修改仓库编辑弹窗*/
    const StockModalGen = ()=><StockModal organizationId={organizationId} organizationName={organizationName}/>;

    /*生成 仓库调拨弹窗*/
    const TransferModalGen = ()=> <TransferModal organizationId={organizationId} organizationName={organizationName}/>;

    return (
        <div className={styles.organizationStock}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onModify}>
                    <FormattedMessage {...messages.modifyButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onTransfer}>
                    <FormattedMessage {...messages.transferButton}/>
                </Button>
            </div>
            <StockList stockList={stockList}/>
            <StockModalGen />
            <TransferModalGen />
        </div>
    );
}

OrganizationStock.propTypes = organizationStockPropTypes;

function mapStateToProps({dealerOrganization, organizationStock}) {
    return {
        currentOrganization: dealerOrganization.currentItem || {},
        organizationStock
    };
}

export default injectIntl(connect(mapStateToProps)(OrganizationStock));
