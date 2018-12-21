// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import type { Location } from 'react-router';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Sidebar from 'semantic-ui-react/dist/commonjs/modules/Sidebar';

import logError from 'core/errorReporting';

import { updateOnRegistration } from 'register/component';

import { clearAlert, appInit } from 'actions/app';

import { getAlert } from 'selectors/app';

import Account from 'sections/Account/components/MenuItem';

import Responsive from '../Responsive';
import Notifier from '../Notifier';
import CompletePurchase from '../BuySubscription/Complete';

import thyme from './Thyme.svg';

import './App.css';
import './print.css';

type AppProps = {
  location: Location;
  children: any;
  alertMessage: string;
  onInitialize: () => void;
  onCloseAlert: () => void;
}

type AppState = {
  menuOpened: boolean;
}

class App extends Component<AppProps, AppState> {
  state = {
    menuOpened: false,
  };

  componentDidMount() {
    const { onInitialize } = this.props;

    onInitialize();
  }

  handleToggle = () => {
    const { menuOpened } = this.state;

    this.setState({ menuOpened: !menuOpened });
  };

  handleClose = () => {
    this.setState({ menuOpened: false });
  };

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  AppLink(name, path, icon: string, exact = false) {
    const { location } = this.props;
    const currentPath = location.pathname;

    return (
      <Link
        className={classnames('item', {
          active: exact
            ? currentPath === path
            : currentPath.indexOf(path) === 0,
        })}
        to={path}
        onClick={this.handleClose}
      >
        <Icon name={icon} />
        {name}
      </Link>
    );
  }

  render() {
    const {
      children,
      alertMessage,
      onCloseAlert,
    } = this.props;
    const { menuOpened } = this.state;

    const MenuItems = (
      <Fragment>
        {this.AppLink('Timesheet', '/', 'stopwatch', true)}
        {this.AppLink('Reports', '/reports', 'chart pie')}
        {this.AppLink('Projects', '/projects', 'sitemap')}
        {this.AppLink('Settings', '/settings', 'cog')}
        <a href="https://usethyme.com/documentation" className="item">
          <Icon name="help circle" />
          Support
        </a>
        <Menu.Menu position="right">
          <Menu.Item>
            <Account />
          </Menu.Item>
        </Menu.Menu>
      </Fragment>
    );

    return (
      <div className="App">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={menuOpened}
            onHide={this.handleClose}
          >
            <Responsive max="desktop">
              {matched => (matched ? MenuItems : null)}
            </Responsive>
          </Sidebar>

          <Sidebar.Pusher dimmed={menuOpened}>
            <Menu fixed="top" inverted>
              <Container>
                <Responsive min="desktop">
                  {matched => (matched ? (
                    <Fragment>
                      <Link className="header item" to="/">
                        <Image
                          size="mini"
                          src={thyme}
                          alt="Thyme"
                          style={{ width: 24, marginRight: '1.5em' }}
                        />
                        Thyme
                      </Link>
                      {MenuItems}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Menu.Item position="left" onClick={this.handleToggle}>
                        <Icon name="sidebar" />
                      </Menu.Item>
                      <Menu.Item className="App-Title">
                        <Image
                          size="mini"
                          src={thyme}
                          alt="Thyme"
                          style={{ width: 24, marginRight: '1.5em' }}
                        />
                        Thyme
                      </Menu.Item>
                    </Fragment>
                  ))}
                </Responsive>
              </Container>
            </Menu>
            <Container fluid className="App__Container">
              <Modal
                open={alertMessage !== ''}
                onClose={onCloseAlert}
                content={alertMessage}
                size="mini"
                actions={[
                  { key: 'OK', content: 'OK', positive: true },
                ]}
              />

              <CompletePurchase />
              <Notifier />

              {children}
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alertMessage: getAlert(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onInitialize() {
      dispatch(appInit());
    },
    onCloseAlert() {
      dispatch(clearAlert());
    },
  };
}

export default withRouter<*>(compose(
  connect(mapStateToProps, mapDispatchToProps),
  updateOnRegistration,
)(App));
