import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import CardSaleForm from '../../components/Customer/CardSale/CardSaleForm/CardSaleForm';
import messages from './messages';
import styles from './index.css';

const cardSalePropTypes = {
    //c: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.customer}/>,
    <FormattedMessage {...messages.title}/>
];

function CardSale({intl}) {
    return (
        <div className={styles.cardSaleContent}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <CardSaleForm />
            </div>
        </div>
    );
}

CardSale.propTypes = cardSalePropTypes;

export default injectIntl(CardSale);