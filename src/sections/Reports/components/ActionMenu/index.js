// @flow

import React from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import './ActionMenu.css';

const printPage = () => window.print();

type ActionMenuProps = {
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
  onDownload: () => void;
};

function ActionMenu({
  onNew,
  onSave,
  onLoad,
  onDownload,
}: ActionMenuProps) {
  const hasPrint = !!window.print;

  return (
    <section className="Report__ActionMenu">
      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onNew} icon="file" />}
        content="New report"
      />

      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onLoad} icon="folder open" />}
        content="Load report"
      />

      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onSave} icon="save" />}
        content="Save current report"
      />

      <Popup
        inverted
        position="bottom right"
        trigger={<Button onClick={onDownload} icon="download" />}
        content="Download PDF report"
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
