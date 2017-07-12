import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import NavLink from '../NavLink/NavLink';
import { Menu, Icon, Layout } from 'antd';
import styles from './index.css';

const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const messages = defineMessages({
  menu1: {
    id: 'common.menuList.menu1',
    defaultMessage: '菜单11',
  },
  menu2: {
    id: 'common.menuList.menu2',
    defaultMessage: '菜单22',
  },
});

const menus = [];

class MenuList extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline',
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed){
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render(){
    let {intl} = this.props;
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={this.state.mode}
          >
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Navigation One</span></span>}>
              <MenuItem key="1">
                <NavLink target="/menu1" linkText={intl.formatMessage(messages.menu1)}/>
              </MenuItem>
              <MenuItem key="2">
                <NavLink target="/menu2" linkText={intl.formatMessage(messages.menu2)}/>
              </MenuItem>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation One</span></span>}>
              <MenuItem key="5">Option 5</MenuItem>
              <MenuItem key="6">Option 6</MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

MenuList.propTypes = {};

export default injectIntl(MenuList, {
  withRef: true,
});
