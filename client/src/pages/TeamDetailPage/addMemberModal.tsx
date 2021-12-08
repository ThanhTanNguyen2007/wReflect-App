import React, { useState, useRef } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { Form, notification, Button, FormInstance, Input, Tag, Modal } from 'antd';
import _ from 'lodash';

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

type Props = {
  isVisible: boolean;
  handleOk: (values: string[]) => void;
  handleCancel: () => void;
};

const AddMembersModal = ({ isVisible, handleOk, handleCancel }: Props) => {
  const [listEmails, setListEmails] = useState<string[]>([]);
  // const formRef = React.createRef<FormInstance<any>>();
  const formRef = useRef<FormInstance>(null);

  const onAddEmail = (value: any) => {
    if (validEmail.test(value.email)) {
      if (!listEmails.includes(value.email)) {
        const newListEmails = _.clone(listEmails);
        setListEmails([...newListEmails, value.email]);
      }
      formRef.current?.resetFields();
    } else {
      notification.warning({
        message: `Notification`,
        description: `${value.email} is not a valid email`,
        placement: 'bottomLeft',
      });
    }
  };

  const handleClose = (removedEmail: string) => {
    const newListEmails = listEmails.filter((email) => email !== removedEmail);
    setListEmails(newListEmails);
  };

  const tagChild = listEmails.map((email) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(email);
        }}
      >
        {email}
      </Tag>
    );
    return (
      <span key={email} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  });

  const handleDeleteData = () => {
    setListEmails([]);
    handleCancel();
  };

  return (
    <Modal
      destroyOnClose
      centered
      title="Add new members to team"
      visible={isVisible}
      onOk={() => handleOk(listEmails)}
      onCancel={handleDeleteData}
    >
      <Form onFinish={(value) => onAddEmail(value)} ref={formRef}>
        <div className="flex">
          <Form.Item
            style={{ flex: 1 }}
            name="email"
            rules={[
              { required: true, message: 'Input is empty' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input allowClear autoFocus placeholder="Please input email to add member in Team" />
          </Form.Item>
          <Form.Item className="ml-10">
            <Button htmlType="submit" size="middle" style={{ width: '100px' }} title="Add" type="primary">
              Add
            </Button>
          </Form.Item>
        </div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
            }}
            onEnd={(e: any) => {
              if (e?.type === 'appear' || e?.type === 'enter') {
                e.target.style = 'display: inline-block';
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
      </Form>
    </Modal>
  );
};

export default AddMembersModal;
