// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

type RenderProp = (...any) => Node;

type TableColumn = {
  name: string;
  row: RenderProp;
  header?: RenderProp;
  footer?: RenderProp;
  textAlign?: 'left' | 'right';
  width?: number;
  style?: any;
};

type TableRow = { id: any } & any;

const registeredColumns: {
  [name: string]: TableColumn[];
} = {};

type TableProps = {
  name: string;
  columns: TableColumn[];
  rows: TableRow[];
};

type TableState = {
  extraColumns: TableColumn[];
};

function getRegisteredColumns(name: string): TableColumn[] {
  return registeredColumns[name] || [];
}

class TableComponent extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super();

    this.state = {
      extraColumns: getRegisteredColumns(props.name),
    };
  }

  render() {
    const { columns, rows } = this.props;
    const { extraColumns } = this.state;

    const allColumns = [...columns, ...extraColumns];

    if (allColumns.length === 0) {
      return null;
    }

    const hasHeader = allColumns.some(column => !!column.header);
    const hasFooter = allColumns.some(column => !!column.footer);

    return (
      <Table celled unstackable>
        {hasHeader && (
          <Table.Header>
            <Table.Row>
              {allColumns.map(column => (
                <Table.HeaderCell
                  key={column.name}
                  width={column.width}
                  style={column.style}
                >
                  {column.header ? column.header(rows) : null}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
        )}
        <Table.Body>
          {rows.map(row => (
            <Table.Row key={row.id}>
              {allColumns.map(column => (
                <Table.Cell
                  key={column.name}
                  textAlign={column.textAlign || 'left'}
                >
                  {column.row(row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        {hasFooter && (
          <Table.Footer>
            <Table.Row>
              {allColumns.map(column => (
                <Table.HeaderCell
                  key={column.name}
                  textAlign={column.textAlign || 'left'}
                >
                  {column.footer ? column.footer(rows) : null}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    );
  }
}

export function create(
  name: string,
  columns: TableColumn[],
  rows: TableRow[],
): { filters: Node, table: Node } {
  return {
    filters: <div>Filters</div>,
    table: <TableComponent name={name} columns={columns} rows={rows} />,
  };
}
