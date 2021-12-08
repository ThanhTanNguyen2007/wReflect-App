import React from 'react'
import{Tabs, Table, Row, Space,Input, Button} from 'antd'
import { DownloadOutlined,UploadOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const UserManagements =()=>{
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    const dataSource = [
        {
          key: '1',
          NAME: 'TNT',
          EMAIL: "TNT@gmail.com",
          REGISTRATIONDATE: '05/12/2021',
          MANAGEMENT:"Acitve"
        },
        {
            key: '2',
            NAME: 'TNT1',
            EMAIL: "TNT123@gmail.com",
            REGISTRATIONDATE: '22/01/2021',
            MANAGEMENT:"Acitve"
          },
      ];
      
      const columns = [
        {
          title: 'NAME',
          dataIndex: 'NAME',
          key: 'NAME    ',

        },
        {
          title: 'EMAIL',
          dataIndex: 'EMAIL',
          key: 'EMAIL',
        },
        {
          title: 'REGISTRATION DATE',
          dataIndex: 'REGISTRATIONDATE',
          key: 'REGISTRATION DATE',
        },
        {
            title: 'MANAGEMENT',
            dataIndex: 'MANAGEMENT',
            key: 'MANAGEMENT',
          },
      ];
    return(
        <Tabs key="0">
        <TabPane key="1" tab="User Managements">
        <div style={{background:"white",height:800}}>
            <Row>
            <Search placeholder="Search User" onSearch={onSearch} style={{ width: 473,marginLeft:300,marginTop:40 }} />
            <div style={{marginTop:40, marginLeft:600}}>
            <Button style={{borderRadius:8,marginRight:10}} type="primary" icon={<UploadOutlined />} >
             Import
            </Button>
             <Button style={{borderRadius:8,marginRight:10}} type="primary" icon={<DownloadOutlined />} >
             Export
            </Button>
            <Button style={{borderRadius:8}} type="primary" >Add Users</Button>

            </div>
            </Row>
            
             <Tabs tabBarStyle={{marginLeft:20}} className="tab-inner" defaultActiveKey="1" style={{ height: '90%' }}>
            <TabPane key="1" tab="All">
            <Table dataSource={dataSource} columns={columns} />;
            </TabPane>
            <TabPane key="2" tab="Active">TNT</TabPane>
            <TabPane key="3" tab="Banner">TNT</TabPane>

            </Tabs>
        </div>

        </TabPane>
        </Tabs>
    )
}
export default UserManagements;