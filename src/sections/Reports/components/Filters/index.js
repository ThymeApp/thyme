// @flow

import React, { Component, Fragment } from 'react';
import type { Node } from 'react';

import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import './Filters.css';

type ReportFiltersType = {
  filters: Array<string>;
  projects: Array<ProjectTreeWithTimeType>;
  columnFilters: Node;
  onToggleProject: (project: string | null) => void;
};

class ReportFilters extends Component<ReportFiltersType> {
  onFilterToggle = (name: string) => (e: Event) => {
    // prevent closing dropdown
    e.preventDefault();
    e.stopPropagation();

    const { onToggleProject } = this.props;
    onToggleProject(name === '' ? null : name);
  };

  render() {
    const {
      filters,
      projects,
      columnFilters,
    } = this.props;

    return (
      <div className="Report__filters">
        <Dropdown text="Filter projects" closeOnBlur={false} style={{ marginRight: '2em' }}>
          <Dropdown.Menu>
            {projects.map((project, index) => (
              <Fragment key={project.id}>
                {index > 0 && project.nameTree.length === 1 && <Dropdown.Divider />}
                <Dropdown.Item
                  onClick={this.onFilterToggle(project.id)}
                >
                  <Checkbox
                    style={{ paddingLeft: (project.nameTree.length - 1) * 20 }}
                    label={project.name}
                    checked={filters.indexOf(project.id) > -1}
                    name={project.id}
                    id={project.id}
                  />
                </Dropdown.Item>
              </Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {columnFilters}
      </div>
    );
  }
}

export default ReportFilters;
