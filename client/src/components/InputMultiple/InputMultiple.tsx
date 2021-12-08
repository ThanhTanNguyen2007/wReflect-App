import React, { useState, useRef, useEffect } from 'react';
import { Select, notification } from 'antd';
import _ from 'lodash';

type Props = {
  placeholder?: string;
  regex?: string;
};

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const InputMultiple = ({ placeholder, regex }: Props) => {
  //   const [textInput, setTextInput] = useState('');
  const [listText, setListText] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const prevListText = useRef<string[]>(listText);

  //   let textInput = '';
  const onChange = (value: string[]) => {
    const newValue = value[value.length - 1];
    const isValidEmail = validEmail.test(newValue);
    if (!isValidEmail) {
      notification.warning({
        message: `Notification`,
        description: `${newValue} is not a valid email`,
        placement: 'bottomLeft',
      });
      return;
    }
    if (!listText.includes(newValue) && validEmail) {
      setListText([...value]);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (!_.isEqual(prevListText.current.sort(), listText.sort())) {
      setLoading(false);
    }
  }, [listText]);

  return (
    <>
      <Select
        loading={loading}
        disabled={loading}
        mode="tags"
        showArrow
        showSearch
        style={{ width: '100%' }}
        value={listText}
        placeholder={placeholder ? placeholder : 'Add multiple'}
        onChange={(value) => onChange(value)}
      />
    </>
  );
};

export default InputMultiple;
