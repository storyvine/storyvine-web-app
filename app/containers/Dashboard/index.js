// @flow
import React, { Component } from 'react';
import Header from 'containers/Header';
import MainMenu from 'containers/MainMenu';
import MainSection from 'containers/MainSection';
import s from './style.scss';

class DashBoard extends Component<*> {
  render() {
    return (
      <div>
        <Header />
        <div className={s.Dashboard__MainSectionWrap}>
          <MainMenu />
          <MainSection />
        </div>
      </div>
    );
  }
}

export default DashBoard;
