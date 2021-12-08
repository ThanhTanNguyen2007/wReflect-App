import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined,UserOutlined,TeamOutlined,StockOutlined,LogoutOutlined,SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const DropDown = ()=>{
  const history = useHistory();
  const redirect = () => {
    history.push('/profileUser')
  }
    const menu = (
        <Menu>
          <Menu.Item key="0" icon={<UserOutlined />} >
            <a onClick={redirect} >My profile</a>
          </Menu.Item>
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <a href="">My team</a>
          </Menu.Item>
         <Menu.Item key="2" icon={<StockOutlined/>}>My Health Check</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4" icon={<SettingOutlined />}>Setting</Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>LogOut</Menu.Item>
        
       </Menu>
      )
    return(
    <Dropdown  overlay={menu} trigger={['click']}>
         <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
     <DownOutlined />
      </a>
  </Dropdown>
)
}
export default DropDown;