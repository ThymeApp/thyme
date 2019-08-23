// @flow

import { createStore } from 'redux';
import type { Dispatch } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

export const defaultState: ContextType = {
  settingsPanels: [],
  components: {},
  columns: {},
  hiddenColumns: {},
};

type AddSettingPanel = {
  type: 'ADD_SETTINGS_PANEL';
  item: SettingsPanel;
};

type AddComponent = {
  type: 'ADD_COMPONENT';
  name: string;
  key: string;
  renderProp: (...any) => any;
};

type AddTableColumn = {
  type: 'ADD_TABLE_COLUMN';
  name: string;
  column: TableColumn;
};

type ToggleTableColumn = {
  type: 'TOGGLE_TABLE_COLUMN';
  name: string;
  column: string;
};

export type UpdateActions = AddSettingPanel | AddComponent | AddTableColumn | ToggleTableColumn;

export default createStore<ContextType, UpdateActions, Dispatch<UpdateActions>>(
  (state, action) => {
    if (!state) {
      return defaultState;
    }

    switch (action.type) {
      case 'ADD_SETTINGS_PANEL':
        return {
          ...state,
          settingsPanels: [...state.settingsPanels, action.item],
        };
      case 'ADD_COMPONENT': {
        const { name, key, renderProp } = action;

        return {
          ...state,
          components: {
            ...state.components,
            [name]: [
              ...(state.components[name] || []),
              {
                key,
                render: renderProp,
              },
            ],
          },
        };
      }
      case 'ADD_TABLE_COLUMN': {
        const { name, column } = action;

        return {
          ...state,
          columns: {
            ...state.columns,
            [name]: [
              ...(state.columns[name] || []),
              column,
            ],
          },
        };
      }
      case 'TOGGLE_TABLE_COLUMN': {
        const { name, column } = action;

        const filters = state.hiddenColumns[name] || [];

        return {
          ...state,
          hiddenColumns: {
            ...state.hiddenColumns,
            [name]: filters.indexOf(column) > -1
              ? filters.filter((item) => item !== column)
              : [...filters, column],
          },
        };
      }
      default:
        return state;
    }
  },
  defaultState,
  devToolsEnhancer(),
);
