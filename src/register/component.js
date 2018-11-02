// @flow

import React, { Fragment } from 'react';

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
