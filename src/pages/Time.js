// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';

import DateRange from '../components/DateRange';
import DateSort from '../components/DateSort';
import ThymeTable from '../components/ThymeTable';

import { getCurrentTimeEntries } from '../selectors/time';

import './Time.css';

type TimeProps = {
  entries: Array<timeType>,
  now?: Date,
};

type TimeState = {
  filterOpen: boolean;
}

class Time extends Component<TimeProps, TimeState> {
  state = {
    filterOpen: false,
  };

  handleToggle = () => {
    const { filterOpen } = this.state;

    this.setState({ filterOpen: !filterOpen });
  };

  render() {
    const { entries, now = new Date() } = this.props;
    const { filterOpen } = this.state;

    return (
      <div className="Time">
        <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
          <Accordion fluid styled>
            <Accordion.Title
              active={filterOpen}
              onClick={this.handleToggle}
              content="Date range / sorting"
            />
            <Accordion.Content active={filterOpen}>
              <Header as="h5">Date range:</Header>
              <DateRange vertical />
              <Header as="h5">Sort by:</Header>
              <DateSort />
            </Accordion.Content>
          </Accordion>
        </Responsive>
        <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          <div className="Time__RangeSort">
            <DateRange />
            <DateSort />
          </div>
        </Responsive>
        <ThymeTable
          entries={entries}
          now={now}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props: TimeProps) {
  const { now } = props;

  return { entries: getCurrentTimeEntries(now || new Date())(state) };
}

export default connect(mapStateToProps)(Time);
