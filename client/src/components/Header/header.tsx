import React from 'react';
import { Menu, Dropdown, Button, Avatar } from 'antd';

import { Login } from '../Login';
import { Logout } from '../Logout';

type Props = {
  email: null | string;
  picture: null | string;
};

const LoginSection = ({ email }: Props) => {
  if (email) {
    const menu = (
      <Menu>
        <Menu.Item key="sign-out">
          <Logout>
            <>Sign out</>
          </Logout>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown placement="bottomRight" overlay={menu}>
        <Button type="text">{`Hi, ${email}`}</Button>
      </Dropdown>
    );
  }
  return (
    <Login isLoggedIn={!!email}>
      <Button>Login / Sign up</Button>
    </Login>
  );
};

const Header = ({ email, picture }: Props) => {
  return (
    <div className="topNavBar" style={{ backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <div style={{ flexGrow: 1 }}>
          <img height="50px" src="../../images/logo.png" alt="wReflect Logo" />{' '}
        </div>
        <div style={{ flexGrow: 1, textAlign: 'right' }}>
          <LoginSection email={email} picture={picture} />
        </div>
      </div>
    </div>
  );
};

export default Header;
