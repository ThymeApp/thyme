// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

type RegisterProps = {
  inView: boolean;
  goToLogin: (e: Event) => void;
};

class Register extends Component<RegisterProps> {
  render() {
    const { inView, goToLogin } = this.props;

    return (
      <div className={classnames('Register', { 'Register--visible': inView })}>
        <Button
          basic
          onClick={goToLogin}
        >
          Back to login
        </Button>
      </div>
    );
  }
}

export default Register;
