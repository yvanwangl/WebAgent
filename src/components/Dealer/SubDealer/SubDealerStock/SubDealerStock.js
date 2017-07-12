import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button} from 'antd';
import ContentTitle from '../../../Common/ContentTitle/ContentTitle';
import StockList from './StockList/StockList';
import SaleModal from './SaleModal/SaleModal';
import ReturnModal from './ReturnModal/ReturnModal';
import messages from './messages';
import styles from './index.css';

const subDealerStockPropTypes = {
    currentPartner: PropTypes.object,
    stockList: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
};
function SubDealerStock({
    intl,
    dispatch,
    currentPartner,
    stockList,
    disabled
}) {

    const {
        organizationId,
        organizationName,
        partnerName
    } = currentPartner;

    /*销售仓库信息*/
    const onSale = ()=>{
        dispatch({
            type:'subDealerSaleStock/showSaleEditor'
        });
    };

    /*退货仓库信息*/
    const onReturn = ()=>{
        dispatch({
            type:'subDealerReturnStock/showReturnEditor'
        });
    };

    /*生成 售出仓库编辑弹窗*/
    const SaleModalGen = ()=><SaleModal subDealerRecord={currentPartner} organizationId={organizationId} organizationName={partnerName}/>;

    /*生成 退还仓库弹窗*/
    const ReturnModalGen = ()=> <ReturnModal subDealerRecord={currentPartner} organizationId={organizationId} organizationName={partnerName}/>;

    return (
        <div className={styles.subDealerStock}>
            <ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>
            <div className='buttonGroup'>
                <Button type="primary" disabled={disabled} onClick={onSale}>
                    <FormattedMessage {...messages.saleButton}/>
                </Button>
                <Button type="primary" disabled={disabled} onClick={onReturn}>
                    <FormattedMessage {...messages.returnButton}/>
                </Button>
            </div>
            <StockList stockList={stockList}/>
            <SaleModalGen />
            <ReturnModalGen />
        </div>
    );
}

SubDealerStock.propTypes = subDealerStockPropTypes;

export default injectIntl(SubDealerStock);
