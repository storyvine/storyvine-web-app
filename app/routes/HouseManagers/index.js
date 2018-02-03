// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type { RouterHistory } from 'react-router';

const loadContainer = () => import('containers/HouseManagers' /* webpackChunkName: "houseManagers" */);

type Props = {
  history: RouterHistory,
};

class HouseManagers extends Component<Props> {
  render() {
    const { history } = this.props;
    return <Chunk load={loadContainer} history={history} />;
  }
}

export default HouseManagers;
