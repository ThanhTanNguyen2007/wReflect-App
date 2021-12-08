import React from 'react';
import { Avatar, Layout, PageHeader } from 'antd';
import DropDown from './components/DropDown';
type Props = {
  email: string | null;
  picture: string | null;
};

const { Header } = Layout;

const TopNavBar = ({ email, picture }: Props) => {
  return (
    <>
      {/* <div className="topNavBar">
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <img height="50px" src="/logo.png" alt="wReflect Logo" />{' '}
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            <Avatar src={picture} size="large" />
          </div>
        </div>
      </div> */}
      <Header className="site-layout-background topNavBar" style={{ padding: 0, backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            <img height="50px" src="../../images/logo.png" alt="wReflect Logo" />{' '}
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right', marginRight: 10 }}>
            <span style={{ marginRight: '4px' }}>Hi, {`${email}`}</span>
            <Avatar className="avatarSetting" src={`${picture}`} size="default" />
          </div>
          <div style={{ marginRight: 20 }}>
            <DropDown />
          </div>
        </div>
      </Header>
    </>
  );
};

export default TopNavBar;
