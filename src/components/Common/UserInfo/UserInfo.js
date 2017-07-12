import React, {Component, PropTypes} from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import messages from './messages';
import classNames from 'classnames/bind';
import styles from './index.css';

const cx = classNames.bind(styles);

const userInfoPropTypes = {
    userInfo: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onMouseOverE: PropTypes.func.isRequired,
    onMouseOutE: PropTypes.func.isRequired,
    modifyPass: PropTypes.func.isRequired,
};

function UserInfo({userInfo, logout, show, onMouseOverE, onMouseOutE, modifyPass}) {
    return (
        <div className={cx({userInfo: true, showUserInfo: show})} onMouseOver={onMouseOverE} onMouseOut={onMouseOutE}
             onClick={onMouseOutE}>
            <div className={styles.currentUser}>{userInfo.partnerStaffName || '操作员名称'}</div>
            <ul className={styles.infoList}>
                {
                    Object.keys(userInfo).map((key) => {
                        if (key != 'partnerStaffName') {
                            return (
                                <li className={styles.infoItem} key={key}>
                                    <span className={styles.infoName}>
                                        <FormattedMessage {...messages[key]}/>：
                                    </span>
                                    <span className={styles.infoValue}>
                                        {
                                            key == 'balance' ?
                                                <FormattedNumber value={userInfo[key]}
                                                                 NumberFormatOptions={{style: 'currency'}}/> :
                                                userInfo[key]
                                        }
                                    </span>
                                </li>
                            );
                        }
                    })
                }
            </ul>
            <ul className={styles.buttonGroup}>
                <li className={styles.button}>
                    <span onClick={() => modifyPass('loginPass')}>
                        <FormattedMessage {...messages.modifyPassword}/>
                    </span>
                </li>
                <li className={styles.button}>
                    <span onClick={() => modifyPass('pinPass')}>
                        <FormattedMessage {...messages.modifyPin}/>
                    </span>
                </li>
                <li className={styles.button}>
                    <span onClick={logout}>
                        <FormattedMessage {...messages.logout}/>
                    </span>
                </li>
            </ul>
        </div>
    );
}

UserInfo.propTypes = userInfoPropTypes;

export default injectIntl(UserInfo, {
    withRef: false,
});
