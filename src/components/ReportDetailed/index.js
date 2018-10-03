// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';
import classnames from 'classnames';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import { timeElapsed } from '../../core/thyme';

import './ReportDetailed.css';

type ReportDetailedType = {
  round: rounding;
  roundAmount: number;
  projects: Array<projectTreeWithTimeType>;
};

type ReportDetailedState = {
  opened: boolean,
  printable: {
    date: boolean,
    start: boolean,
    end: boolean,
    duration: boolean,
    project: boolean,
    notes: boolean,
  },
};

class ReportDetailed extends Component<ReportDetailedType, ReportDetailedState> {
  state = {
    opened: false,
    printable: {
      date: true,
      start: true,
      end: true,
      duration: true,
      project: true,
      notes: true,
    },
  };

  onChangePrintView = (e: Event, data: { checked: boolean, column: string }) => {
    const { printable } = this.state;
    this.setState({
      printable: {
        ...printable,
        [data.column]: data.checked,
      },
    });
  };

  toggleDetails = () => {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  };

  render() {
    const { round, roundAmount, projects } = this.props;
    const { opened, printable } = this.state;

    return (
      <Accordion className="ReportDetailed">
        <Accordion.Title active={opened} onClick={this.toggleDetails}>
          <Icon name="dropdown" />
          Detailed view
        </Accordion.Title>
        <Accordion.Content active={opened}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.date })}>
                  Date
                  <Checkbox
                    checked={printable.date}
                    column="date"
                    onClick={this.onChangePrintView}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.start })}>
                  Start
                  <Checkbox
                    checked={printable.start}
                    column="start"
                    onChange={this.onChangePrintView}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.end })}>
                  End
                  <Checkbox
                    checked={printable.end}
                    column="end"
                    onChange={this.onChangePrintView}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.duration })}>
                  Duration
                  <Checkbox
                    checked={printable.duration}
                    column="duration"
                    onChange={this.onChangePrintView}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.project })}>
                  Project
                  <Checkbox
                    checked={printable.project}
                    column="project"
                    onChange={this.onChangePrintView}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({ 'no-print': !printable.notes })}>
                  Notes
                  <Checkbox
                    checked={printable.notes}
                    column="notes"
                    onChange={this.onChangePrintView}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map(project => project.entries.map(entry => (
                <Table.Row key={entry.id}>
                  <Table.Cell className={classnames({ 'no-print': !printable.date })}>
                    {format(entry.start, 'DD/MM/YYYY')}
                  </Table.Cell>
                  <Table.Cell className={classnames({ 'no-print': !printable.start })}>
                    {format(entry.start, 'HH:mm')}
                  </Table.Cell>
                  <Table.Cell className={classnames({ 'no-print': !printable.end })}>
                    {format(entry.end, 'HH:mm')}
                  </Table.Cell>
                  <Table.Cell className={classnames({ 'no-print': !printable.duration })}>
                    {timeElapsed(
                      entry.start,
                      entry.end,
                      false,
                      false,
                      round,
                      roundAmount,
                    )}
                  </Table.Cell>
                  <Table.Cell className={classnames({ 'no-print': !printable.project })}>
                    {project.nameTree.join(' > ')}
                  </Table.Cell>
                  <Table.Cell className={classnames({ 'no-print': !printable.notes })}>
                    {entry.notes}
                  </Table.Cell>
                </Table.Row>
              )))}
            </Table.Body>
          </Table>
          <Message warning>
            Checked columns will be visible in the print version of this page
          </Message>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ReportDetailed;
