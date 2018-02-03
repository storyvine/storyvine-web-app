// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type { RouterHistory } from 'react-router-dom';

const loadContainer = () => import('containers/Properties' /* webpackChunkName: "properties" */);

type Props = {
  history: RouterHistory,
};

class Properties extends Component<Props> {
  render() {
    const { history } = this.props;
    return <Chunk load={loadContainer} history={history} />;
  }
}

export default Properties;
