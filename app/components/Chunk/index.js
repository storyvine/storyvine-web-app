// @flow
import * as React from 'react';
import Loading from 'components/Loading';
import type { RouterHistory } from 'react-router-dom';

type ChunkProps = {
  load: () => Promise<any>,
  useLoading?: boolean,
  history?: RouterHistory,
};

type ChunkState = {
  LoadedComponent: ?React.ComponentType<any>,
};

class Chunk extends React.Component<ChunkProps, ChunkState> {
  static defaultProps = {
    useLoading: false,
  };

  state = {
    LoadedComponent: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: ChunkProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props: ChunkProps) {
    this.setState({
      LoadedComponent: null,
    });

    props.load().then(mod => {
      this.setState({
        // handle both es imports and cjs
        LoadedComponent: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    const { LoadedComponent } = this.state;
    const { useLoading } = this.props;

    const otherProps = Object.assign({}, this.props);
    delete otherProps.load;

    // eslint-disable-next-line
    return LoadedComponent ? (
      <LoadedComponent {...otherProps} />
    ) : useLoading ? (
      <Loading />
    ) : null;
  }
}

export default Chunk;
