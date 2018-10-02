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
    printable: any, 
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

    onChangePrintView = (data: any, column: any) => {
      const { printable } = this.state;
      console.log(printable);
      printable[column] = data.checked;
      this.setState({printable: printable});
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
                  <Table.HeaderCell className={date ? null : 'no-print'}>
                    Date
                    <Checkbox  toggle defaultChecked onClick={((e, data) => this.onChangePrintView(data, "date"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell className={start ? null : 'no-print'}>
                    Start
                    <Checkbox toggle defaultChecked onClick={((e, data) => this.onChangePrintView(data, "start"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell className={end ? null : 'no-print'}>
                    End
                    <Checkbox toggle defaultChecked onClick={((e, data) => this.onChangePrintView(data, "end"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell className={duration ? null : 'no-print'}>
                    Duration
                    <Checkbox toggle defaultChecked onClick={((e, data) => this.onChangePrintView(data, "duration"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell  className={project ? null : 'no-print'}>
                    Project
                    <Checkbox toggle  defaultChecked onClick={((e, data) => this.onChangePrintView(data, "project"))}/> 
                  </Table.HeaderCell>
                  <Table.HeaderCell className={notes ? null : 'no-print'}>
                    Notes
                    <Checkbox toggle defaultChecked   onClick={((e, data) => this.onChangePrintView(data, "notes"))}/> 
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {projects.map(project => project.entries.map(entry => (
                  <Table.Row key={entry.id}>
                    <Table.Cell className={date ? null : 'no-print'}>
                      {format(entry.start, 'DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell className={start ? null : 'no-print'}>
                      {format(entry.start, 'HH:mm')}
                    </Table.Cell>
                    <Table.Cell className={end ? null : 'no-print'}>
                      {format(entry.end, 'HH:mm')}
                    </Table.Cell>
                    <Table.Cell className={duration ? null : 'no-print'}>
                      {timeElapsed(
                        entry.start,
                        entry.end,
                        false,
                        false,
                        round,
                        roundAmount,
                      )}
                    </Table.Cell>
                    <Table.Cell className={project ? null : 'no-print'}>
                      {project.nameTree.join(' > ')}
                    </Table.Cell>
                    <Table.Cell className={notes ? null : 'no-print'}>
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
