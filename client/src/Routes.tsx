import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Me } from './types';
import { Team } from './pages/TeamPage';
import { TopNavBar } from './components/TopNavBar';
import TeamDetail from './pages/TeamDetailPage/teamDetail';
import { ProfileUser } from './components/ProfileUser';
import { DashBoard } from './components/DashBoard';
import { UserManagements } from './components/UserManagements';
type Props = {
  me: null | Me;
};

const { Footer, Content } = Layout;

const Routes = ({ me }: Props): JSX.Element => {
  const isLoggedIn = !!me;
  const email = me?.email || null;
  const isAdmin = me?.isAdmin || null;
  const name = me?.name || null;
  const picture = me?.picture || null;

  return (
    <Router>
      <Switch>
        <Route>
          <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
            {isLoggedIn && (
              <>
                <SideBar email={email} isAdmin={isAdmin} />
                <Layout className="site-layout">
                  <TopNavBar email={email} picture={picture} />
                  <Content style={{ margin: '0 16px', height: '100%', overflow: 'auto' }}>
                    <Switch>
                      {isLoggedIn && (
                        <>
                          <Route path="/workspace" component={Team}></Route>
                          <Redirect to="/workspace" />
                        </>
                      )}
                    </Switch>
                    <Route exact path="/teams/:id" render={({ match }) => <TeamDetail teamId={match.params.id} />} />
                    <Route path="/profileUser" component={ProfileUser}>
                      <ProfileUser email={email} picture={picture} name={name} />
                    </Route>
                    <Route path="/dashboard" component={DashBoard} />
                    <Route path="/user-Managements" component={UserManagements} />
                  </Content>
                  <Footer style={{ textAlign: 'center', height: '50px' }}>wReflect ©2022</Footer>
                </Layout>
              </>
            )}
            {!isLoggedIn && <Redirect to="/home" />}
            {/* <Header email={email} /> */}
            <Route path="/home">
              {/* <HomePage /> */}
              <HomePage email={email} picture={picture} />
            </Route>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
