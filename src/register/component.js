// @flow

import React from 'react';
import { invoke } from 'thyme-connect';

import { useRegisterConsumer } from './Consumer';
import { registerComponent } from './Actions';

export function register(name: string, key: string, renderProp: (...any) => any) {
  registerComponent(name, key, renderProp);
}

function RenderComponent({ name, props }: { name: string, props: any }) {
  const components = useRegisterConsumer('components');

  if (!components[name]) {
    return null;
  }

  return components[name].map((c) => <c.render key={`${name}_${c.key}`} {...props} />);
}

export function render(name: string, props: any) {
  return <RenderComponent name={name} props={props} />;
}

// register method on thyme-connect
invoke('registerComponent', register);
