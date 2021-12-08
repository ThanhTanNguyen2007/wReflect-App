import React, { useState } from 'react';
import { Row, Tabs, Avatar, Button, Modal, Input, Upload, message, Cascader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Props = {
  email: string | null;
  picture: string | null;
  name: string | null;
};
const { TextArea, Search } = Input;
const { TabPane } = Tabs;

const ProfileUser = ({ email, picture, name }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal1 = () => {
    setIsModalVisible(true);
  };

  const key = 'updatable';
  const handleOk = () => {
    setIsModalVisible(false);
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Create new team successfully!', key, duration: 2 });
    }, 1000);
  };
  const onSearch = (value: any) => console.log(value);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Row>
      <Tabs style={{ flex: 1 }}>
        <TabPane style={{ textAlign: 'center', marginTop: 21 }} key="0">
          <div style={{ background: 'white', height: 800, marginRight: 20 }}>
            <div>
              <Avatar className="avatarSetting" src={`${picture}`} style={{ height: 150, width: 150, marginTop: 20 }} />
            </div>
            <div style={{ marginTop: 20, fontSize: 20 }}>
              {name === null ? <p>Please help me edit user name</p> : name}
            </div>
            <div
              style={{ marginLeft: 10, display: 'inline-block', whiteSpace: 'nowrap', width: 490, overflow: 'hidden' }}
            >
              <div style={{ marginTop: 20, display: 'flex' }}>
                <h2>Email</h2>
                <p style={{ marginLeft: 100, fontSize: 20 }}>{`${email}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h2>Introduction</h2>
                <p style={{ marginLeft: 32, fontSize: 20 }}>Tôi có thể làm mọi thứ bạn muốn</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h2>Talents</h2>
                <p style={{ marginLeft: 85, fontSize: 20 }}>Front-end</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h2>Interesting</h2>
                <p style={{ marginLeft: 48, fontSize: 20 }}>Read Book, Sing, Football</p>
              </div>
            </div>
            <div style={{ marginTop: 50 }}>
              <Button type="primary" style={{ width: 400, height: 50, borderRadius: 10 }} onClick={showModal1}>
                Edit details
              </Button>
            </div>
          </div>
          <Modal title="Edit details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ alignItems: 'center', flex: 1 }}>
              <Avatar
                className="avatarSetting"
                src={`${picture}`}
                style={{ height: 100, width: 100, marginLeft: 180 }}
              />
            </div>
            <Upload {...props}>
              <Button style={{ marginLeft: 160, marginTop: 20 }} icon={<UploadOutlined />}>
                Upload image
              </Button>
            </Upload>
            <div style={{ marginTop: 20 }}>
              Name
              <Input placeholder="User Name..." />
            </div>
            <div style={{ marginTop: 20 }}>
              Email
              <Input placeholder="Email User..." />
            </div>
            <div style={{ marginTop: 20 }}>
              Description
              <TextArea placeholder="Mô tả nhóm" rows={4} />
            </div>
          </Modal>
        </TabPane>
      </Tabs>
      <Tabs style={{ flex: 2 }}>
        <TabPane tab="Introduction" key="1">
          <div style={{ background: 'white', height: 800 }}>
            <div style={{ padding: 10 }}>
              <h1>
                <u>My Introduction</u>
              </h1>
              <TextArea
                style={{ marginTop: 10, marginLeft: 50, width: 1100, height: 150 }}
                placeholder="Nhập thông tin giới thiệu"
                rows={8}
              />
              <hr style={{ marginTop: 20, width: '70%' }} />

              <h1>
                <u>My Talents</u>
              </h1>
              <TextArea
                style={{ marginTop: 10, marginLeft: 50, width: 1100, height: 150 }}
                placeholder="Nhập tài năng của bạn"
                rows={8}
              />
              <hr style={{ marginTop: 20, width: '70%' }} />
              <h1>
                <u>My Interesting</u>
              </h1>
              <TextArea
                style={{ marginTop: 10, marginLeft: 50, width: 1100, height: 150 }}
                placeholder="Nhập sở thích của bạn"
                rows={8}
              />
              <Button type="primary" style={{ marginTop: 40, marginRight: 30, width: 100, height: 40, borderRadius: 10, fontSize: 15, float: 'right'}}>
                Save
              </Button>
               <Button type="default" style={{ marginTop: 40, marginRight: 30, width: 100, height: 40, borderRadius: 10, fontSize: 15, float: 'right'}}>
                Edit
              </Button>
            </div>
            
          </div>
        </TabPane>
        <TabPane tab="My Portfolio" key="2">
          Portfolio
        </TabPane>
        <TabPane tab="Team" key="3">
          Team
        </TabPane>
      </Tabs>
    </Row>
  );
};

export default ProfileUser;
