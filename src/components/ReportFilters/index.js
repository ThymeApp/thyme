// @flow

import React, { Fragment, Component } from 'react';
import classnames from 'classnames';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import './ReportFilters.css';

type ReportFiltersType = {
  filters: Array<string>;
  projects: Array<projectTreeWithTimeType>;
  onToggle: (project: string | null) => void;
};

type ReportFiltersState = {
  isVisible: boolean;
};

class ReportFilters extends Component<ReportFiltersType, ReportFiltersState> {
  state = {
    isVisible: false,
  };

  onFilterToggle = (e: Event, action: any) => {
    if (action.type === 'checkbox') {
      const { onToggle } = this.props;
      const { name } = action;
      onToggle(name === '' ? null : name);
    }
  };

  onToggleFiltersVisible = () => {
    const { isVisible } = this.state;

    this.setState({ isVisible: !isVisible });
  };

  render() {
    const { filters, projects } = this.props;
    const { isVisible } = this.state;

    return (
      <div className="Report__filters">
        <Menu vertical>
          <Menu.Item header as="button" onClick={this.onToggleFiltersVisible}>
            <Icon name="triangle right" className={classnames({ isVisible })} />
            Filter projects
          </Menu.Item>
          {isVisible && projects.map(project => (
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
