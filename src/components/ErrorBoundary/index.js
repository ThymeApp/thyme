// @flow

import React, { Component } from 'react';

import logError from 'core/errorReporting';

type ErrorBoundaryState = {
  showError: boolean;
};

class ErrorBoundary extends Component<*, ErrorBoundaryState> {
  state = {
    showError: false,
  };

  componentDidCatch(error: Error, errorInfo: any) {
    if (error.message.match(/Loading chunk [0-9]+ failed/)) {
      this.setState({ showError: true });
      return;
    }

    logError(error, errorInfo);
  }

  render() {
    const { showError } = this.state;
    const { children } = this.props;

    if (showError) {
      return (
        <div style={{ padding: '3em', textAlign: 'center' }}>
          <h2>Whoops! Could not load necessary files.</h2>
          <p>
            Please reload to try again.
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
