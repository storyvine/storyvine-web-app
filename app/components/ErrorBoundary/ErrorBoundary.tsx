import * as React from 'react';
import Raven from 'raven-js';
import AppError from './containers/AppError';
import { FallbackComponentProps, ErrorInfo } from './types';

interface ErrorBoundaryProps {
  fallbackComponent: React.ComponentType<FallbackComponentProps>,
  onError: (error: Error, info: ErrorInfo) => void,
};

interface ErrorBoundaryState {
  error: Error | null,
  info: ErrorInfo | null,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps: ErrorBoundaryProps = {
    onError: () => undefined,
    fallbackComponent: AppError,
  };

  state: ErrorBoundaryState = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error: error,
      info: info,
    });

    Raven.captureException(error, {
      extra: {
        info,
      },
    });
    this.props.onError(error, info);
  }

  render() {
    const { error, info } = this.state;

    if (error && info) return React.createElement(this.props.fallbackComponent, { error, info });
    return this.props.children;
  }
}

export default ErrorBoundary;

export const withErrorBoundary = (Component: any) => (props: any) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);
