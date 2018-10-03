// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import classnames from 'classnames';

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
  
  constructor () {
    super();
    this.onChangePrintView = this.onChangePrintView.bind(this);
  }

  state = {
    opened: false,
    printable: {date: true, start: true, end: true, duration: true, project: true, notes: true }
  };

  onChangePrintView = (e: Event, data: { checked: boolean, column: string }) => {
    const { printable } = this.state;
    this.setState({
      printable:  {
        ...printable,   
        [data.column]: data.checked 
      }
    });
}
  
  toggleDetails = () => {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  };

  render() {
    const { round, roundAmount, projects } = this.props;
    const { opened } = this.state;
    const { printable } = this.state; 
    const {date, start, end, duration, project, notes} = printable; 
    return (
      <Accordion className="ReportDetailed">
        <Accordion.Title active={opened} onClick={this.toggleDetails}>
          <Icon name="dropdown" />
          Detailed view - 
        </Accordion.Title>
        <Accordion.Content active={opened}>
        <Message info>
          <p>Select Columns to be in the print view</p>
        </Message>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={classnames({'no-print': date})}>
                  Date
                  <Checkbox  toggle defaultChecked  column="date" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({'no-print': start})}>
                  Start
                  <Checkbox toggle defaultChecked column="start" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({'no-print': end})}>
                  End
                  <Checkbox toggle defaultChecked column="end" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({'no-print': duration})}>
                  Duration
                  <Checkbox toggle defaultChecked column="duration" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
                <Table.HeaderCell  className={classnames({'no-print': project})}>
                  Project
                  <Checkbox toggle  defaultChecked column="project" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
                <Table.HeaderCell className={classnames({'no-print': notes})}>
                  Notes
                  <Checkbox toggle defaultChecked column="notes" onClick={this.onChangePrintView}/> 
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map(project => project.entries.map(entry => (
                <Table.Row key={entry.id}>
                  <Table.Cell className={classnames({'no-print': date})}>
                    {format(entry.start, 'DD/MM/YYYY')}
                  </Table.Cell>
                  <Table.Cell className={classnames({'no-print': start})}>
                    {format(entry.start, 'HH:mm')}
                  </Table.Cell>
                  <Table.Cell className={classnames({'no-print': end})}>
                    {format(entry.end, 'HH:mm')}
                  </Table.Cell>
                  <Table.Cell className={classnames({'no-print': duration})}>
                    {timeElapsed(
                      entry.start,
                      entry.end,
                      false,
                      false,
                      round,
                      roundAmount,
                    )}
                  </Table.Cell>
                  <Table.Cell className={classnames({'no-print': project})}>
                    {project.nameTree.join(' > ')}
                  </Table.Cell>
                  <Table.Cell className={classnames({'no-print': notes})}>
                    {entry.notes}
                  </Table.Cell>
                </Table.Row>
              )))}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ReportDetailed;
