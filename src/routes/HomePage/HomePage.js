import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {FormattedMessage, defineMessages} from 'react-intl';
import HomeHeader from '../../components/Common/HomeHeader/HomeHeader';
import {menus, messages} from './menus';
import NavLink from '../../components/Common/NavLink/NavLink';
import {Layout, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import styles from './index.css';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class HomePage extends Component {

    constructor(props) {
        //super函数的调用要放在constructor函数的最顶端
        super(props);
        //初始化组件state
        this.state = {
            collapsed: false,
            mode: 'inline',
        };
    }

    //propTypes 静态属性声明
    static propTypes = {
        isAdmin: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired
    };

    // 使用箭头函数声明，可以避免this绑定的问题
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    render() {
        //props 属性解构，每个属性占一行
        const {
            isAdmin,
            children
        } = this.props;
        //state 属性解构，每个属性占一行
        const {
            collapsed,
            mode
        } = this.state;
        return (
            <Layout
                className={styles.homePage}
            >
                <Header className={styles.header}>
                    <HomeHeader />
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode={mode}
                            defaultSelectedKeys={[isAdmin ? menus[0][3][0][0] : menus[1][3][0][0]]}
                            defaultOpenKeys={[menus[0][0], menus[1][0], menus[2][0]]}
                        >
                            {
                                menus.map(([key, name, icon, children]) => {
                                    if (!isAdmin && key == 'dealer') {
                                        return null;
                                    }else {
                                        return (
                                            <SubMenu
                                                key={key}
                                                title={<span><Icon type={icon}/><span className="nav-text">{
                                                    <FormattedMessage {...messages[name]}/>}</span></span>}
                                            >
                                                {
                                                    children.map(([key, name, target]) => (
                                                        <MenuItem key={key}>
                                                            <NavLink target={target}>
                                                                <FormattedMessage {...messages[name]}/>
                                                            </NavLink>
                                                        </MenuItem>
                                                    ))
                                                }
                                            </SubMenu>
                                        );
                                    }
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className={styles.content}>
                            {children}
                        </Content>
                        <Footer className={styles.footer}>
                            Copyright ©2017 StarTimes Software.All Right Reserved.
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps({login}) {
    return {
        isAdmin: login.isAdmin
    };
}

export default connect(mapStateToProps)(HomePage);
