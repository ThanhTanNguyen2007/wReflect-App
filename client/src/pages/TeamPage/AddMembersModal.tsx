import React from 'react';
import { Space, Select, Modal } from 'antd';
import { setVerbosity } from 'ts-invariant';

type Props = {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
};

const AddMembersModal = ({ isVisible, setVisible }: Props) => {
  const [value, setValue] = React.useState(['a10', 'c12', 'h17', 'j19', 'k20']);


  const options = [];

  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
      label: `Long Label: ${value}`,
      value,
    });
  }

  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  };

  const onOke = () => {
    setVisible(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Create Your Team"
      visible={isVisible}
      onOk={() => onOke()}
      onCancel={() => setVisible(false)}
    >
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          value={value}
          options={options}
          placeholder="Select item"
          maxTagCount="responsive"
          onChange={(newValue: string[]) => {
            setValue(newValue);
          }}
        />
      </Space>
    </Modal>
  );
};

export default AddMembersModal;
