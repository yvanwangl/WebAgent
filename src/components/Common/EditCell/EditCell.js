import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import styles from './index.css';

const editCellPropTypes = {
    //c: PropTypes.object.isRequired
};
function EditCell({intl}) {
    return (
        <div className={styles.normal}>
            <FormattedMessage {...messages.welcome}/>
        </div>
    );
}

EditCell.propTypes = editCellPropTypes;

export default injectIntl(EditCell, {
    withRef: true,
});