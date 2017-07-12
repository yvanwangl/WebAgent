import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
import {numberFormat} from '../../../utils/util';
import ModalAlert from '../ModalAlert/ModalAlert';
import ModifyPass from '../ModifyPass/ModifyPass';
import logoTop from '../../../assets/logo_top.png';
import {Button, Menu, Dropdown, Icon, Modal} from 'antd';
import messages from './messages';
import styles from "./index.css";

const MenuItem = Menu.Item;
const ButtonGroup = Button.Group;

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserInfo: false
        };
    }

    static propTypes = {
        login: PropTypes.object.isRequired,
        modifyPass: PropTypes.object.isRequired
    };

    handleMouseOver = () => {
        this.setState({
            showUserInfo: true
        });
    };

    handleMouseOut = () => {
        this.setState({
            showUserInfo: false
        });
    };

    /*退出按钮点击事件*/
    logout = () => {
        let {dispatch, intl} = this.props;
        let {formatMessage} = intl;
        Modal.confirm({
            title: formatMessage(messages.title),
            content: formatMessage(messages.content),
            /* okText: formatMessage(messages.okText),
             cancelText: formatMessage(messages.cancelText),*/
            onOk: () => {
                dispatch({
                    type: 'login/doLogout'
                });
            }
        });
    };

    /*修改密码按钮点击事件*/
    modifyPass = (passType) => {
        let {dispatch} = this.props;
        dispatch({
            type: 'modifyPass/modifyPass',
            passType
        });
    };

    /*查询余额按钮点击事件*/
    handleBalanceClick = (e) => {
        let {dispatch} = this.props;
        dispatch({
            type:'login/getBalance'
        });
    };

    /*获取账户余额成功弹窗*/
    modalAlertPropsGen = ()=> {
        const {dispatch, login} = this.props;
        let {account, balance} = login;
        return {
            type: 'success',
            title: <FormattedMessage {...messages.balanceTitle}/>,
            content: (
                <div>
                    <p> Balance： {numberFormat(balance)}</p>
                    <p> Account： {account}</p>
                </div>
            ),
            onOk(){
                dispatch({
                    type: 'login/hideBalanceModal'
                });
            },
        };
    };

    render() {
        let {login} = this.props;
        let {getBalanceSuccess, userInfo} = login;
        let modalAlertProps = this.modalAlertPropsGen();

        const menu = (
            <Menu>
                <MenuItem key="1">
                    <div onClick={() => this.modifyPass('loginPass')}>
                        <FormattedMessage {...messages.modifyPassword}/>
                    </div>
                </MenuItem>
                <MenuItem key="2">
                    <div onClick={() => this.modifyPass('pinPass')}>
                        <FormattedMessage {...messages.modifyPin}/>
                    </div>
                </MenuItem>
                <MenuItem key="3">
                    <div onClick={this.logout}>
                        <FormattedMessage {...messages.logout}/>
                    </div>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={styles.homeHeader}>
                <div className={styles.wrapper}>
                    <img src={logoTop} alt="Startimes"/>
                    <span
                        className={styles.userWrapper}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                    >
                        <span className={styles.infoItem}>
                            <Icon type="user"
                                  style={{color: '#068bc4'}}/> {userInfo.partnerStaffName} {userInfo.partnerStaffCode}
                        </span>
                        <span className={styles.infoItem}>
                            <Icon type="idcard" style={{color: '#068bc4'}}/> {userInfo.role}
                        </span>
                        <span>
                            <ButtonGroup>
                                <Button onClick={this.handleBalanceClick}>
                                    <FormattedMessage {...messages.balance}/>
                                </Button>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </ButtonGroup>
                        </span>
                    </span>
                </div>
                {/*<UserInfo
                 modifyPass = {this.modifyPass}
                 userInfo={userInfo}
                 logout={this.logout}
                 show={showUserInfo}
                 onMouseOverE={this.handleMouseOver}
                 onMouseOutE={this.handleMouseOut}
                 />*/}
                <ModifyPass />
                {
                    getBalanceSuccess && <ModalAlert {...modalAlertProps} />
                }
            </div>
        );
    }
}

function mapStateToProps({login, modifyPass}) {
    return {login, modifyPass};
}

export default injectIntl(connect(mapStateToProps)(HomeHeader), {
    withRef: true,
});
