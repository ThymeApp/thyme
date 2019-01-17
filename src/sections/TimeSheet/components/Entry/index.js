// @flow

import React, { Component } from 'react';

import { saveTemporaryItem, clearTemporaryItem } from 'core/localStorage';
import { changeTimer } from 'core/extensions/events';

import Entry from './Entry';
import NewEntry from './New';

function enrichBrowserEntry(C) {
  return class BrowserEntry extends Component<*, *> {
    onUpdateItem = (tracking: boolean, entry: TimePropertyType) => {
      const timer = { ...entry, tracking };

      // communicate to extensions
      changeTimer(timer);

      // save temporary state to localStorage
      saveTemporaryItem(timer);
    };

    onResetItem = (entry: TimePropertyType) => {
      // communicate change of timer
      changeTimer({
        tracking: false,
        ...entry,
      });

      // clear item from localStorage
      clearTemporaryItem();
    };

    render() {
      return (
        <C
          onUpdateItem={this.onUpdateItem}
          onResetItem={this.onResetItem}
          {...this.props}
        />
      );
    }
  };
}

const enrichedEntry = enrichBrowserEntry(Entry);
const enrichedNewEntry = enrichBrowserEntry(NewEntry);

export { enrichedEntry as Entry };
export { enrichedNewEntry as NewEntry };
