import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Breadcrumb} from 'antd';
import styles from './index.css';

const breadcrumbListPropTypes = {
    breadcrumbItems: PropTypes.array.isRequired
};

const BreadcrumbItem = Breadcrumb.Item;

function BreadcrumbList({breadcrumbItems}) {
    return (
        <div className={styles.breadcrumbList}>
            <Breadcrumb>
                {
                    breadcrumbItems.map((item, index)=> <BreadcrumbItem key={index}>{item}</BreadcrumbItem>)
                }
            </Breadcrumb>
        </div>
    );
}

BreadcrumbList.propTypes = breadcrumbListPropTypes;

export default injectIntl(BreadcrumbList);