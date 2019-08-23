// @flow

import React, { useCallback } from 'react';
import type { Node } from 'react';
import { invoke } from 'thyme-connect';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import RegisterConsumer from './Consumer';
import { registerTableColumn, toggleTableColumn } from './Actions';

type TableRow = { id: any } & any;

export function registerColumn(name: string, column: TableColumn) {
  registerTableColumn(name, column);
}

// register method on thyme-connect
invoke('registerColumn', registerColumn);

type ColumnWrapperProps = {
  name: string;
  children: ({
    extraColumns: TableColumn[];
    hiddenColumns: string[];
    onToggleColumn: (name: string) => void;
  }) => Node;
};

function ColumnWrapper(props: ColumnWrapperProps) {
  const { children, name } = props;

  const onToggleColumn = useCallback((columnName: string) => {
    toggleTableColumn(name, columnName);
  }, [name]);

  return (
    <RegisterConsumer>
      {(state) => children({
        extraColumns: (state.columns[name] || []),
        hiddenColumns: (state.hiddenColumns[name] || []),
        onToggleColumn,
      })}
    </RegisterConsumer>
  );
}

type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  extraColumns: TableColumn[];
  hiddenColumns: string[];
  extraProps?: any;
};

function TableComponent({
  columns,
  rows,
  extraColumns,
  hiddenColumns,
  extraProps,
}: TableProps) {
  const allColumns = [...columns, ...extraColumns]
    .filter((column) => hiddenColumns.indexOf(column.name) === -1);

  if (allColumns.length === 0) {
    return null;
  }

  const hasHeader = allColumns.some((column) => !!column.header);
  const hasFooter = allColumns.some((column) => !!column.footer);

  return (
    <Table {...extraProps} celled unstackable>
      {hasHeader && (
        <Table.Header>
          <Table.Row>
            {allColumns.map((column) => (
              <Table.HeaderCell
                key={column.name}
                width={column.width}
                style={column.style}
                collapsing={column.collapsing}
                textAlign={column.textAlign || 'left'}
              >
                {column.header ? column.header(rows) : null}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            {allColumns.map((column) => (
              <Table.Cell
                key={column.name}
                width={column.width}
                style={column.style}
                collapsing={column.collapsing}
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
            {allColumns.map((column) => (
              <Table.HeaderCell
                key={column.name}
                width={column.width}
                style={column.style}
                collapsing={column.collapsing}
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
        {allColumns.map((column) => (
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
  props?: any,
): { filters: Node, table: Node } {
  const cols: TableColumn[] = [];

  columns.forEach((c) => c !== null && cols.push(c));

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
            extraProps={props}
          />
        )}
      </ColumnWrapper>
    ),
  };
}
