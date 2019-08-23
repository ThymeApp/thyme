// @flow

import React, { Component } from 'react';

import logError from 'core/errorReporting';

type ErrorBoundaryState = {
  showError: boolean;
};

class ErrorBoundary extends Component<*, ErrorBoundaryState> {
  constructor() {
    super();

    this.state = {
      showError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (error.message.match(/Loading( CSS)? chunk [0-9]+ failed/)) {
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
          <h2>Whoops! Could not load necessary files for this page.</h2>
          <p>
            Please reload the page to try again.
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
