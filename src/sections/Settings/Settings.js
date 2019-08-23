// @flow

import React, { Component, Fragment } from 'react';
import type { Match, RouterHistory } from 'react-router';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';

import { trackPageview } from 'core/analytics';

import RegisterConsumer from 'register/Consumer';

import TimeSheet from './components/TimeSheet';
import Rounding from './components/Rounding';
import ImportExport from './components/ImportExport';
import DeleteData from './components/DeleteData';
import Advanced from './components/Advanced';

import './Settings.css';

type SettingsProps = {
  match: Match;
  history: RouterHistory;
};

class Settings extends Component<SettingsProps> {
  componentDidMount() {
    trackPageview('Settings');
  }

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
          onClick={this.handleAccordionToggle(url, name)}
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

  handleAccordionToggle = (url: string, name: string) => () => {
    const { history } = this.props;

    history.push(`/settings/${url}`);

    trackPageview(`Settings / ${name}`);
  };

  render() {
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
    ];

    return (
      <Container text className="Settings">
        <Header as="h1">
          Settings
        </Header>

        <RegisterConsumer>
          {(state) => (
            <Accordion fluid styled>
              {[...panels, ...state.settingsPanels].map(this.settingsItem)}
            </Accordion>
          )}
        </RegisterConsumer>

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

        <p className="AppVersion">
          App version:
          {' '}
          {process.env.REACT_APP_VERSION}
        </p>
      </Container>
    );
  }
}

export default Settings;
