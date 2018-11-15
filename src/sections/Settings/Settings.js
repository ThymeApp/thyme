// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import type { Match, RouterHistory } from 'react-router';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';

import { isLoggedIn } from 'sections/Account/selectors';

import { listen, unlisten, items } from '../../register/settings';

import TimeSheet from './components/TimeSheet';
import Rounding from './components/Rounding';
import Account from './components/Account';
import ImportExport from './components/ImportExport';
import DeleteData from './components/DeleteData';
import Advanced from './components/Advanced';

import './Settings.css';

type SettingsProps = {
  loggedIn: boolean;
  match: Match;
  history: RouterHistory;
};

type SettingsState = {
  extraPanels: SettingsPanel[];
};

class Settings extends Component<SettingsProps, SettingsState> {
  constructor() {
    super();

    this.state = {
      extraPanels: items(),
    };
  }

  componentDidMount() {
    listen(this.onPanelAdd);
  }

  componentWillUnmount() {
    unlisten(this.onPanelAdd);
  }

  onPanelAdd = () => {
    this.setState({ extraPanels: items() });
  };

  settingsItem = (item: SettingsPanel | null) => {
    if (!item) {
      return null;
    }

    const { match } = this.props;

    const activePage = match.params.page || 'timesheet';

    const { url, name, content } = item;

    const active = activePage === url;

    return (
      <Fragment key={name}>
        <Accordion.Title
          active={active}
          index={url}
          onClick={this.handleAccordionToggle(url)}
        >
          <Icon name="dropdown" />
          {name}
        </Accordion.Title>
        <Accordion.Content active={active}>
          {content}
        </Accordion.Content>
      </Fragment>
    );
  };

  handleAccordionToggle = (url: string) => () => {
    const { history } = this.props;

    history.push(`/settings/${url}`);
  };

  render() {
    const { loggedIn } = this.props;
    const { extraPanels } = this.state;

    const panels: Array<SettingsPanel | null> = [
      {
        url: 'timesheet',
        name: 'Timesheet settings',
        content: <TimeSheet />,
      },
      {
        url: 'rounding',
        name: 'Duration time Rounding',
        content: <Rounding />,
      },
      loggedIn ? {
        url: 'account',
        name: 'Account settings',
        content: <Account />,
      } : null,
      {
        url: 'export-import',
        name: 'Export / Import data',
        content: <ImportExport />,
      },
      {
        url: 'delete',
        name: 'Delete data',
        content: <DeleteData />,
      },
      {
        url: 'advanced',
        name: 'Advanced settings',
        content: <Advanced />,
      },
      ...extraPanels,
    ];

    return (
      <Container className="Settings">
        <Header as="h1">
          Settings
        </Header>

        <Accordion fluid styled>{panels.map(this.settingsItem)}</Accordion>

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

const mapStateToProps = (state: StateShape) => ({
  loggedIn: isLoggedIn(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Settings);
