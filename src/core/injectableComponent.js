// @flow

import React, { Fragment } from 'react';

const injectables: {
  [name: string]: { key: string, render: (...any) => any }[];
} = {};

export function registerInjectable(name: string, key: string, render: (...any) => any) {
  if (!injectables[name]) {
    injectables[name] = [];
  }

  injectables[name] = [
    ...injectables[name],
    {
      key,
      render,
    },
  ];
}

export function renderInjectable(name: string, props: any) {
  if (!injectables[name]) {
    return null;
  }

  return (
    <Fragment>
      {injectables[name].map(i => <Fragment key={`${name}_${i.key}`}>{i.render(props)}</Fragment>)}
    </Fragment>
  );
}
