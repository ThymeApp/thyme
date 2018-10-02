  // @flow

  import React, { Component } from 'react';
  import format from 'date-fns/format';

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
  };

  class ReportDetailed extends Component<ReportDetailedType, ReportDetailedState> {
    state = {
      opened: false,
    };

    onChangePrintView = (data: any, column: any) => {
      console.log(data.checked)
      console.log(column);
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
                  <Table.HeaderCell>
                    Date
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "date"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Start
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "start"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    End
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "end"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Duration
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "duration"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Project
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "project"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Notes
                    <Checkbox toggle onClick={((e, data) => this.onChangePrintView(data, "notes"))}/> 
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {projects.map(project => project.entries.map(entry => (
                  <Table.Row key={entry.id}>
                    <Table.Cell>
                      {format(entry.start, 'DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell>
                      {format(entry.start, 'HH:mm')}
                    </Table.Cell>
                    <Table.Cell>
                      {format(entry.end, 'HH:mm')}
                    </Table.Cell>
                    <Table.Cell>
                      {timeElapsed(
                        entry.start,
                        entry.end,
                        false,
                        false,
                        round,
                        roundAmount,
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {project.nameTree.join(' > ')}
                    </Table.Cell>
                    <Table.Cell>
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
