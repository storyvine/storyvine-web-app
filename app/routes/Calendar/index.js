// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type { RouterHistory } from 'react-router-dom';

const loadContainer = () => import('containers/Calendar' /* webpackChunkName: "calendar" */);

type Props = {
  history: RouterHistory,
};

class Calendar extends Component<Props> {
  render() {
    const { history } = this.props;
    return <Chunk load={loadContainer} history={history} />;
  }
}

export default Calendar;
