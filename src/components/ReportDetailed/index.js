// @flow

import React, { Component } from 'react';
import { Table, Accordion, Icon } from 'semantic-ui-react';
import format from 'date-fns/format';

import { timeElapsed } from '../../core/thyme';

type ReportDetailedType = {
  projects: Array<projectTreeWithTimeType>,
};

type ReportDetailedState = {
  opened: boolean,
};

class ReportDetailed extends Component<ReportDetailedType, ReportDetailedState> {
  constructor() {
    super();

    this.toggleDetails = () => {
      this.setState({
        opened: !this.state.opened,
      });
    };

    this.state = {
      opened: false,
    };
  }

  toggleDetails: () => void;

  render() {
    const { projects } = this.props;
    const { opened } = this.state;

    return (
      <Accordion>
        <Accordion.Title active={opened} onClick={this.toggleDetails}>
          <Icon name="dropdown" />
          Detailed view
        </Accordion.Title>
        <Accordion.Content active={opened}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Project</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map(project => project.entries.map(entry => (
                <Table.Row key={entry.id}>
                  <Table.Cell>{format(entry.start, 'DD/MM/YYYY')}</Table.Cell>
                  <Table.Cell>{format(entry.start, 'HH:mm')}</Table.Cell>
                  <Table.Cell>{format(entry.end, 'HH:mm')}</Table.Cell>
                  <Table.Cell>{timeElapsed(entry.start, entry.end)}</Table.Cell>
                  <Table.Cell>{project.nameTree.join(' > ')}</Table.Cell>
                  <Table.Cell>{entry.notes}</Table.Cell>
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
