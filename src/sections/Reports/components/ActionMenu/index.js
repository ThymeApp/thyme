// @flow

import React from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import './ActionMenu.css';

const printPage = () => window.print();

type ActionMenuProps = {
  onSave: () => void;
  onLoad: () => void;
};

function ActionMenu({ onSave, onLoad }: ActionMenuProps) {
  const hasPrint = !!window.print;

  return (
    <section className="Report__ActionMenu">
      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onSave} icon="save" />}
        content="Save current report"
      />

      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onLoad} icon="folder open" />}
        content="Load report"
      />

      {hasPrint && (
        <Popup
          inverted
          position="bottom right"
          trigger={<Button onClick={printPage} icon="print" />}
          content="Print this report"
        />
      )}
    </section>
  );
}

export default ActionMenu;
