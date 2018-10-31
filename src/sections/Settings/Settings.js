// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import type { Node } from 'react';
import mitt from 'mitt';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';

import { isLoggedIn } from 'sections/Account/selectors';

import TimeSheet from './components/TimeSheet';
import Rounding from './components/Rounding';
import Account from './components/Account';
import ImportExport from './components/ImportExport';
import DeleteData from './components/DeleteData';

import './Settings.css';

type SettingsItem = { name: string, content: Node };

const emitter = mitt();
const ADD_PANEL = 'settings.add.panel';
let extraSettingsItems: SettingsItem[] = [];

export function registerSettingsItem(item: SettingsItem) {
  extraSettingsItems = [...extraSettingsItems, item];

  emitter.emit(ADD_PANEL);
}

type SettingsProps = {
  loggedIn: boolean;
};

type SettingsState = {
  activeIndex: number;
  extraSettingsItems: SettingsItem[];
};

class Settings extends Component<SettingsProps, SettingsState> {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
      extraSettingsItems,
    };
  }

  componentDidMount() {
    emitter.on(ADD_PANEL, this.onPanelAdd);
  }

  componentWillUnmount() {
    emitter.off(ADD_PANEL, this.onPanelAdd);
  }

  onPanelAdd = () => {
    this.setState({ extraSettingsItems });
  };

  settingsItem = (item: SettingsItem | null, index: number) => {
    if (!item) {
      return null;
    }

    const { activeIndex } = this.state;
    const { name, content } = item;

    return (
      <Fragment key={name}>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={this.handleAccordionToggle(index)}
        >
          <Icon name="dropdown" />
          {name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {content}
        </Accordion.Content>
      </Fragment>
    );
  };

  handleAccordionToggle = (index: number) => () => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { loggedIn } = this.props;
    const { extraSettingsItems } = this.state;

    const items: Array<SettingsItem | null> = [
      {
        name: 'Timesheet settings',
        content: <TimeSheet />,
      },
      {
        name: 'Duration time rounding',
        content: <Rounding />,
      },
      loggedIn ? {
        name: 'Account settings',
        content: <Account />,
      } : null,
      {
        name: 'Export / Import data',
        content: <ImportExport />,
      },
      {
        name: 'Delete data',
        content: <DeleteData />,
      },
      ...extraSettingsItems,
    ];

    return (
      <Container className="Settings">
        <Header as="h1">
          Settings
        </Header>

        <Accordion fluid styled>{items.map(this.settingsItem)}</Accordion>

        <Header as="h3">
          About
        </Header>

        <p>
          Thyme is a creation by&nbsp;
          <a href="https://theclevernode.com">
            Gaya Kessler
          </a>
          .
          It is&nbsp;
          <a href="https://github.com/Gaya/thyme">
            open source
          </a>
          &nbsp;and free to use.
          All your data is stored in your own browser.
          Issues / requests can be&nbsp;
          <a href="https://github.com/Gaya/thyme/issues">
            filed on Github
          </a>
          .
        </p>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: isLoggedIn(state) });

export default connect(mapStateToProps)(Settings);
