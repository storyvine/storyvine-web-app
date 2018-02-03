// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type { RouterHistory } from 'react-router-dom';

const loadContainer = () => import('containers/Vendors' /* webpackChunkName: "vendors" */);

type Props = {
  history: RouterHistory,
};

class Vendors extends Component<Props> {
  render() {
    const { history } = this.props;
    return <Chunk load={loadContainer} history={history} />;
  }
}

export default Vendors;
