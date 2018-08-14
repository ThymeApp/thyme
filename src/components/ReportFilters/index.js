// @flow

import React, { Component } from 'react';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import './ReportFilters.css';

type ReportFiltersType = {
  filters: Array<string>;
  projects: Array<projectTreeWithTimeType>;
  onToggle: (project: string | null) => void;
};

class ReportFilters extends Component<ReportFiltersType> {
  onFilterToggle = (e: Event, action: any) => {
    if (action.type === 'checkbox') {
      const { onToggle } = this.props;
      const { name } = action;
      onToggle(name === '' ? null : name);
    }
  };

  render() {
    const { filters, projects } = this.props;

    return (
      <div className="Report__filters">
        <Menu vertical>
          <Menu.Item header>
            Filter projects:
          </Menu.Item>
          {projects.map(project => (
            <Menu.Item key={project.id}>
              <Checkbox
                toggle
                label={project.name}
                checked={filters.indexOf(project.id) > -1}
                onChange={this.onFilterToggle}
                name={project.id}
                id={project.id}
              />
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ReportFilters;
