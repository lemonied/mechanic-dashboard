import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header>
      <Link to={'/'}>首页</Link>
      <Link to={'/recognition'}>测试</Link>
    </header>
  );
};

export { Header };
