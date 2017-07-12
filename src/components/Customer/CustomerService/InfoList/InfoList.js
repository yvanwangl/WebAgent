import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import styles from './index.css';

const infoListPropTypes = {
    infoObject: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
};
function InfoList({infoObject, messages}) {
    return (
        <ul className={styles.infoList}>
            {
                Object.keys(infoObject).map( key =>
                    <li key={key}>
                        <span className={styles.infoName}>
                            <FormattedMessage {...messages[key]}/>:
                        </span>
                        <span>{infoObject[key]}</span>
                    </li>
                )
            }
        </ul>
    );
}

InfoList.propTypes = infoListPropTypes;

export default injectIntl(InfoList);