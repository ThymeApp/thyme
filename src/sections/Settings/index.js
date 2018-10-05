// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';

import Rounding from './components/Rounding';
import Account from './components/Account';
import ImportExport from './components/ImportExport';
import DeleteData from './components/DeleteData';

import { isLoggedIn } from '../../selectors/account';

import './Settings.css';

type SettingsProps = {
  loggedIn: boolean;
};

type SettingsState = {
  activeIndex: number;
};

class Settings extends Component<SettingsProps, SettingsState> {
  state = { activeIndex: 0 };

  settingsItem = (item: { name: string, content: any } | null, index: number) => {
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

    const items = [
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
