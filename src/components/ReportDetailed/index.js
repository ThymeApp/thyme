// @flow

import React, { Component } from 'react';
import { Table, Accordion, Icon } from 'semantic-ui-react';

import { formatDuration } from '../../core/thyme';

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
                <Table.HeaderCell>Project</Table.HeaderCell>
                <Table.HeaderCell width={2}>Total spent</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map(project => (
                <Table.Row key={project.id}>
                  <Table.Cell>{project.nameTree.join(' > ')}</Table.Cell>
                  <Table.Cell>{formatDuration(project.time * 60)}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell />
                <Table.Cell>
                  {formatDuration(projects.reduce((total, project) => total + (project.time * 60), 0))}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ReportDetailed;
