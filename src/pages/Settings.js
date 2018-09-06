// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';

import Account from '../components/Settings/Account';
import ImportExport from '../components/Settings/ImportExport';
import DeleteData from '../components/Settings/DeleteData';

import { isLoggedIn } from '../selectors/account';

import './Settings.css';

type SettingsProps = {
  loggedIn: boolean;
};

type SettingsState = {
  activeIndex: number;
};

class Settings extends Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super();

    this.state = {
      activeIndex: props.loggedIn ? 0 : 1,
    };
  }

  handleClick = (e: Event, titleProps: { index: number}) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { loggedIn } = this.props;

    return (
      <Container className="Settings">
        <Header as="h1">
          Settings
        </Header>

        <Accordion fluid styled>
          {loggedIn && (
            <Fragment>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Account
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Account />
              </Accordion.Content>
            </Fragment>
          )}
          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name="dropdown" />
            Import Export
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ImportExport />
          </Accordion.Content>
          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name="dropdown" />
            Delete data
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <DeleteData />
          </Accordion.Content>
        </Accordion>

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
