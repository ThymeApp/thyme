// @flow

import React from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import BuyButton from './Button';

import './Message.css';

type BuyMessageProps = {
  children: string;
};

function BuyMessage({ children }: BuyMessageProps) {
  return (
    <Message warning className="BuyMessage" compact>
      {children}
      <BuyButton basic primary={false}>
        Get Premium
      </BuyButton>
    </Message>
  );
}

export default BuyMessage;
