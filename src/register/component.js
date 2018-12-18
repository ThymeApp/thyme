// @flow

import React, { Component, Fragment } from 'react';
import { invoke } from 'thyme-connect';

import mitt from 'mitt';

const emitter = mitt();
const ADD_COMPONENT = 'thyme.add.component';

const injectables: {
  [name: string]: { key: string, render: (...any) => any }[];
} = {};

export function register(name: string, key: string, renderProp: (...any) => any) {
  if (!injectables[name]) {
    injectables[name] = [];
  }

  injectables[name] = [
    ...injectables[name],
    {
      key,
      render: renderProp,
    },
  ];

  emitter.emit(ADD_COMPONENT);
}

export function render(name: string, props: any) {
  if (!injectables[name]) {
    return null;
  }

  return (
    <Fragment>
      {injectables[name].map(i => <Fragment key={`${name}_${i.key}`}>{i.render(props)}</Fragment>)}
    </Fragment>
  );
}

export function updateOnRegistration<P>(C: React$ComponentType<P>): React$ComponentType<P> {
  return class UpdateOnRegistration extends Component<*, { lastRegistration: Date }> {
    state = {
      lastRegistration: new Date(),
    };

    componentDidMount() {
      emitter.on(ADD_COMPONENT, this.onRegisterComponent);
    }

    componentWillUnmount() {
      emitter.off(ADD_COMPONENT, this.onRegisterComponent);
    }

    onRegisterComponent = () => this.setState({ lastRegistration: new Date() });

    render() {
      return <C {...this.props} />;
    }
  };
}

// register method on thyme-connect
invoke('registerComponent', register);
