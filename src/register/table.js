// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import mitt from 'mitt';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

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

const emitter = mitt();
const ADD_COLUMN = 'table.add.column';
const UPDATE_HIDDEN_COLUMNS = 'table.update.hiddenColumns';

const registeredColumns: {
  [name: string]: TableColumn[];
} = {};

export function registerColumn(name: string, column: TableColumn) {
  if (!registeredColumns[name]) {
    registeredColumns[name] = [];
  }

  registeredColumns[name] = [...registeredColumns[name], column];

  emitter.emit(ADD_COLUMN, name);
}

export function registerColumns(name: string, columns: TableColumn[]) {
  columns.forEach(column => registerColumn(name, column));
}

function getRegisteredColumns(name: string): TableColumn[] {
  return registeredColumns[name] || [];
}

function toggleFilter(filters: string[], filter: string) {
  if (filters.indexOf(filter) > -1) {
    return filters.filter(item => item !== filter);
  }

  return [...filters, filter];
}

type ColumnWrapperState = {
  extraColumns: TableColumn[];
  hiddenColumns: string[];
};

type ColumnWrapperProps = {
  name: string;
  children: (ColumnWrapperState & { onToggleColumn: (name: string) => void }) => any;
};

class ColumnWrapper extends Component<ColumnWrapperProps, ColumnWrapperState> {
  constructor(props: ColumnWrapperProps) {
    super();

    this.state = {
      extraColumns: getRegisteredColumns(props.name),
      hiddenColumns: [],
    };
  }

  componentDidMount() {
    emitter.on(ADD_COLUMN, this.updateColumns);
    emitter.on(UPDATE_HIDDEN_COLUMNS, this.updateHiddenColumns);
  }

  componentWillUnmount() {
    emitter.off(ADD_COLUMN, this.updateColumns);
    emitter.off(UPDATE_HIDDEN_COLUMNS, this.updateHiddenColumns);
  }

  onToggleColumn = (columnName: string) => {
    const { name } = this.props;
    const { hiddenColumns } = this.state;

    emitter.emit(UPDATE_HIDDEN_COLUMNS, {
      tableName: name,
      hiddenColumns: toggleFilter(hiddenColumns, columnName),
    });
  };

  updateColumns = (tableName: any) => {
    const { name } = this.props;

    if (tableName === name) {
      this.setState({
        extraColumns: getRegisteredColumns(name),
      });
    }
  };

  updateHiddenColumns = ({ tableName, hiddenColumns }: any) => {
    const { name } = this.props;

    if (tableName === name) {
      this.setState({ hiddenColumns });
    }
  };

  render() {
    const { children } = this.props;
    const { extraColumns, hiddenColumns } = this.state;

    return children({ extraColumns, hiddenColumns, onToggleColumn: this.onToggleColumn });
  }
}

type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  extraColumns: TableColumn[];
  hiddenColumns: string[];
};

function TableComponent({
  columns,
  rows,
  extraColumns,
  hiddenColumns,
}: TableProps) {
  const allColumns = [...columns, ...extraColumns]
    .filter(column => hiddenColumns.indexOf(column.name) === -1);

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
                textAlign={column.textAlign || 'left'}
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
                width={column.width}
                style={column.style}
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
                width={column.width}
                style={column.style}
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

type FiltersProps = {
  columns: TableColumn[];
  extraColumns: TableColumn[];
  hiddenColumns: string[];
  onToggleColumn: (name: string) => void;
};

function Filters({
  columns,
  extraColumns,
  hiddenColumns,
  onToggleColumn,
}: FiltersProps) {
  const allColumns = [...columns, ...extraColumns];

  return (
    <Dropdown text="Show columns" closeOnBlur={false}>
      <Dropdown.Menu>
        {allColumns.map(column => (
          <Dropdown.Item
            key={column.name}
            onClick={(e: Event) => {
              // prevent closing dropdown
              e.preventDefault();
              e.stopPropagation();

              onToggleColumn(column.name);
            }}
          >
            <Checkbox
              label={column.name}
              checked={hiddenColumns.indexOf(column.name) === -1}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function create(
  name: string,
  columns: Array<TableColumn | null>,
  rows: TableRow[],
): { filters: Node, table: Node } {
  const cols: TableColumn[] = [];

  columns.forEach(c => c !== null && cols.push(c));

  return {
    filters: (
      <ColumnWrapper name={name}>
        {({ extraColumns, hiddenColumns, onToggleColumn }) => (
          <Filters
            name={name}
            columns={cols}
            extraColumns={extraColumns}
            hiddenColumns={hiddenColumns}
            onToggleColumn={onToggleColumn}
          />
        )}
      </ColumnWrapper>
    ),
    table: (
      <ColumnWrapper name={name}>
        {({ extraColumns, hiddenColumns }) => (
          <TableComponent
            name={name}
            columns={cols}
            rows={rows}
            extraColumns={extraColumns}
            hiddenColumns={hiddenColumns}
          />
        )}
      </ColumnWrapper>
    ),
  };
}
