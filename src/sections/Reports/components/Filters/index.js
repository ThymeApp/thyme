// @flow

import React, { Component } from 'react';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

type ReportFiltersType = {
  filters: Array<string>;
  projects: Array<projectTreeWithTimeType>;
  columns: { name: string, id: string }[];
  hideColumns: Array<string | null>;
  onToggleProject: (project: string | null) => void;
  onToggleColumn: (column: string) => void;
};

class ReportFilters extends Component<ReportFiltersType> {
  onFilterToggle = (name: string) => (e: Event) => {
    // prevent closing dropdown
    e.preventDefault();
    e.stopPropagation();

    const { onToggleProject } = this.props;
    onToggleProject(name === '' ? null : name);
  };

  onColumnToggle = (name: string) => (e: Event) => {
    // prevent closing dropdown
    e.preventDefault();
    e.stopPropagation();

    const { onToggleColumn } = this.props;
    onToggleColumn(name);
  };

  render() {
    const {
      filters,
      projects,
      columns,
      hideColumns,
    } = this.props;

    return (
      <div className="Report__filters">
        <Dropdown text="Filter projects" closeOnBlur={false} style={{ marginRight: '2em' }}>
          <Dropdown.Menu>
            {projects.map(project => (
              <Dropdown.Item
                key={project.id}
                onClick={this.onFilterToggle(project.id)}
              >
                <Checkbox
                  label={project.name}
                  checked={filters.indexOf(project.id) > -1}
                  name={project.id}
                  id={project.id}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text="Show columns" closeOnBlur={false}>
          <Dropdown.Menu>
            {columns.map(column => (
              <Dropdown.Item
                key={column.id}
                onClick={this.onColumnToggle(column.id)}
              >
                <Checkbox
                  label={column.name}
                  checked={hideColumns.indexOf(column.id) === -1}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ReportFilters;
