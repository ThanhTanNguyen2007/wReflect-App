import React from 'react';
import { Image } from 'antd';
import { Header } from './../../components/Header';

type Props = {
  email: string | null;
  picture: string | null;
};

const HomePage = ({ email,picture }: Props) => {
  return (
    <>
      <Header email={email} picture={picture}/>
      <div className="flex flex-jc-sa flex-ai-sa">
        <Image preview={false} src="/images/homePageMale.png" alt="image" />
        <Image preview={false} src="/images/homePageFemale.png" alt="image" />
      </div>
    </>
  );
};

export default HomePage;
