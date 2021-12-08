import React, { useState } from 'react';
import { Menu, Button, Tabs, Skeleton, Table } from 'antd';

import { format } from 'date-fns';
import { ColumnsType } from 'antd/lib/table';
import { useMutation, useQuery } from '@apollo/client';

import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddMembersModal from './addMemberModal';
import { MemberQueries } from '../../grapql-client/queries';

const { TabPane } = Tabs;
const { SubMenu } = Menu;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'user',
    key: 'name',
    render: (user: any) => {
      return user.name;
    },
  },
  {
    title: 'Email',
    align: 'center',
    dataIndex: 'user',
    key: 'email',
    render: (user: any) => user.email,
  },
  {
    title: 'Joined At',
    dataIndex: 'joinedAt',
    key: 'joinedAt',
    render: function hello(joinedAt: any) {
      return <>{format(new Date(+joinedAt), 'd MMM yyyy')}</>;
    },
  },
  {
    title: 'Assigned By',
    dataIndex: 'assignedBy',
    key: 'assignedBy',
  },
  {
    title: 'Owner',
    dataIndex: 'isOwner',
    key: 'isOwner',
    render: (isOwner: any) => {
      return isOwner ? 'Yes' : 'No';
    },
  },
];

type Props = {
  teamId: string;
};

const TeamDetail = ({ teamId }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { loading, data } = useQuery(MemberQueries.getListMembers, {
    variables: { teamId: +teamId },
  });
  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 4 }} />;
  }

  const onHandleSearch = (searchText: string) => {
    setSearchText(searchText);
    setActiveKey('1');
  };

  const operations = (
    <>
      <div className="flex flex-ai-c flex-jc-c mb-10">
        <Button className="btn-delete-team mr-10" icon={<PlusCircleOutlined />} size="middle">
          Delete Team
        </Button>
        <Button className="mr-10" icon={<PlusCircleOutlined />} size="middle" onClick={() => setIsModalVisible(true)}>
          New Member
        </Button>
        <SearchBar placeholder="What are you looking for ?" isLoading={isLoading} onHandleSearch={onHandleSearch} />
      </div>
    </>
  );

  const handleOk = (values: string[]) => {
    console.log('values are', values);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Tabs className="tab" defaultActiveKey="1" style={{ height: '100%' }}>
      <TabPane tab="Team Detail" key="1">
        <div className="site-layout-background card-workspace" style={{ padding: 24, height: '100%' }}>
          <Tabs
            type="card"
            className="tab-inner"
            activeKey={activeKey}
            style={{ height: '90%' }}
            tabBarExtraContent={operations}
            onChange={(key: string) => {
              setActiveKey(key);
            }}
          >
            <TabPane tab="Member" key="1" className="flex flex-jc-c" style={{}}>
              <Menu defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1" icon={<DownOutlined />} title="Owner">
                  <Table dataSource={data?.members.filter((member: any) => member.isOwner)} columns={columns} />;
                </SubMenu>
                <SubMenu key="sub2" icon={<DownOutlined />} title="Member">
                  <Table dataSource={data?.members.filter((member: any) => !member.isOwner)} columns={columns} />;
                </SubMenu>
              </Menu>
            </TabPane>
            <TabPane tab="Setting" key="2" className="flex flex-jc-c" style={{ overflow: 'auto' }}>
              <div>hello</div>
            </TabPane>
            <TabPane tab="Analytics" key="3" className="flex flex-jc-c" style={{ overflow: 'auto' }}>
              <div>Data</div>
            </TabPane>
          </Tabs>
          <AddMembersModal isVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default TeamDetail;
