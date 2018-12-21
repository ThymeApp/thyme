// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

type BuyButtonProps = {
  children?: string;
  basic?: boolean;
  primary?: boolean;
  showIcon?: boolean;
  icon?: string;
};

function BuyButton({
  children,
  basic,
  primary,
  showIcon,
  icon,
}: BuyButtonProps) {
  return (
    <Button
      as={Link}
      basic={basic}
      primary={typeof primary === 'undefined' ? true : primary}
      to="/premium"
    >
      {(typeof showIcon === 'undefined' || showIcon) && <Icon name={icon || 'diamond'} />}
      {children || 'Buy Subscription'}
    </Button>
  );
}

export default BuyButton;
