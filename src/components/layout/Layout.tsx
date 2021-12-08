import React, { FC, ReactNode } from 'react';
import { combineClassNames } from '../../helpers/utils';
import { Header } from './Header';
import './Layout.scss';

interface Props {
  header?: ReactNode;
  className?: string;
  contentClassName?: string;
}
const Layout: FC<Props> = (props) => {
  const { header = <Header/>, className, children, contentClassName } = props;
  return (
    <div className={combineClassNames('klee-layout', className)}>
      {
        header ?
          header :
          null
      }
      <div className={combineClassNames('klee-layout-content', contentClassName)}>{children}</div>
    </div>
  );
};

export { Layout };
