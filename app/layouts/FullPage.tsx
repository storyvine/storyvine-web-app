import * as React from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import s from './FullPage.scss';

interface Props {
  children: any,
};

const FullPage = ({ children }: Props) => (
  <div className={s.FullPage__MainSectionWrap}>
    <Sidebar />
    <div className={s.FullPage__MainSection}>
      <Header />
      {children}
    </div>
  </div>
);

export default FullPage;
