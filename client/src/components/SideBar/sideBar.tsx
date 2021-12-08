import React, { useState } from 'react';
import { Menu, Tabs, Layout } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Logout } from '../Logout';

import {
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  StockOutlined,
  TeamOutlined,
  CarryOutOutlined,
  HomeOutlined,
  CalendarOutlined,
  WifiOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;

type Props = {
  email: null | string;
  isAdmin: null | boolean;
};

const SideBar = ({ email, isAdmin }: Props) => {
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(true);
  const history = useHistory();
  const dashboard = () => {
    history.push('/dashboard');
  };
  const userManagements = () => {
    history.push('/user-Managements');
  };

  return (
    <>
      {email && (
        <Sider
          className="sidebar"
          onMouseEnter={() => setIsCollapse(false)}
          onMouseLeave={() => setIsCollapse(true)}
          collapsed={isCollapse}
          onCollapse={(collapse) => setIsCollapse(collapse)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item icon={<HomeOutlined />} style={{ marginTop: 100 }} key="/WorkSpace">
              <Link to="/workspace">Home</Link>
            </Menu.Item>
            {/* {location.pathname === '/team-detail' ? (
              <Menu.Item icon={<RollbackOutlined />} key="/WorkSpace">
                <a href="/">
                  <span>Back</span>
                </a>
              </Menu.Item>
            ) : (
              <Menu.Item icon={<HomeOutlined />} style={{marginTop:100}} key="/WorkSpace">
                <a href="/">
                  <span>Home</span>
                </a>
              </Menu.Item>
            )} */}

            <SubMenu style={{ marginTop: 50 }} key="sub1" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                Board
              </Menu.Item>
              <Menu.Item key="4" icon={<StockOutlined />}>
                Health Check
              </Menu.Item>
              <Menu.Item key="5" icon={<CarryOutOutlined />}>
                Task
              </Menu.Item>
              <Menu.Item key="6" icon={<CalendarOutlined />}>
                Manager
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="7" icon={<WifiOutlined />} onClick={dashboard}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="8" icon={<UsergroupDeleteOutlined />} onClick={userManagements}>
              User Managements
            </Menu.Item>

            <Menu.Item key="9" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>

            <Menu.Item style={{}} key="10" icon={<LogoutOutlined />}>
              <Logout>
                <>Sign out</>
              </Logout>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      {/* </Sider> */}
    </>
  );
};

export default SideBar;
