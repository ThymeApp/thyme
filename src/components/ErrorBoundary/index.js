// @flow

import { Component } from 'react';

import logError from 'core/errorReporting';

class ErrorBoundary extends Component<*, *> {
  componentDidCatch(error: Error, errorInfo: any) {
    logError(error, errorInfo);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default ErrorBoundary;
