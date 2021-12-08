import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import TeamsCard from './TeamsCard';

import TeamCreateModal from './TeamCreateModal';
import SearchBar from '../../components/SearchBar/SearchBar';

const { TabPane } = Tabs;

const Team = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [loading, setIsLoading] = useState(false);

  const onHandleSearch = (searchText: string) => {
    setSearchText(searchText);
    setActiveKey('1');
    setPage(1);
  };

  const operations = (
    <>
      <div className="flex flex-ai-c flex-jc-c">
        <Button className="mr-10" icon={<PlusCircleOutlined />} size="middle" onClick={() => setIsModalVisible(true)}>
          New Team
        </Button>
        <SearchBar placeholder="What are you looking for ?" isLoading={loading} onHandleSearch={onHandleSearch} />
      </div>
    </>
  );

  return (
    <Tabs className="tab" defaultActiveKey="1" style={{ height: '100%' }}>
      <TabPane tab="WorkSpace" key="1">
        <div className="site-layout-background card-workspace" style={{ padding: 24, height: '100%' }}>
          <Tabs
            type="card"
            className="tab-inner"
            activeKey={activeKey}
            style={{ height: '90%' }}
            tabBarExtraContent={operations}
            onChange={(key: string) => {
              console.log(typeof key);
              setActiveKey(key);
            }}
          >
            <TabPane tab="All" key="1" className="flex flex-ai-c flex-jc-c flex-dir-c">
              <TeamsCard
                status=""
                setIsLoading={setIsLoading}
                searchText={searchText}
                page={page}
                size={size}
                setSize={setSize}
                setPage={setPage}
              />
            </TabPane>
            <TabPane tab="Doing" key="2" className="flex flex-ai-c flex-jc-c flex-dir-c">
              <TeamsCard
                status="Doing"
                setIsLoading={setIsLoading}
                searchText={searchText}
                page={page}
                size={size}
                setSize={setSize}
                setPage={setPage}
              />
            </TabPane>
            <TabPane tab="Done" key="3" className="flex flex-ai-c flex-jc-c flex-dir-c">
              <TeamsCard
                status="Done"
                setIsLoading={setIsLoading}
                searchText={searchText}
                page={page}
                size={size}
                setSize={setSize}
                setPage={setPage}
              />
            </TabPane>
          </Tabs>

          <TeamCreateModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </div>
      </TabPane>
      <TabPane tab="My Portfolio" key="2" style={{ height: '100%' }}>
        <div className="site-layout-background card-workspace" style={{ padding: 24, height: '100%' }}></div>
      </TabPane>
    </Tabs>
  );
};
export default Team;
