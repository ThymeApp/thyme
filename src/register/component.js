// @flow

import React, { Fragment } from 'react';
import { invoke } from 'thyme-connect';

import RegisterConsumer from './Consumer';
import { registerComponent } from './Actions';

export function register(name: string, key: string, renderProp: (...any) => any) {
  registerComponent(name, key, renderProp);
}

export function render(name: string, props: any) {
  return (
    <RegisterConsumer propKey="components">
      {components => (components[name]
        ? components[name].map(c => (
          <Fragment key={`${name}_${c.key}`}>
            {c.render(props)}
          </Fragment>
        ))
        : null)}
    </RegisterConsumer>
  );
}

// register method on thyme-connect
invoke('registerComponent', register);
