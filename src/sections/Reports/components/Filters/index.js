// @flow

import React, { Fragment, useCallback } from 'react';
import type { Node } from 'react';

import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import './Filters.css';

type ReportFiltersProps = {
  filters: Array<string>;
  projects: Array<ProjectTreeWithTimeType>;
  columnFilters: Node;
  onToggleProject: (project: string | null) => void;
};

function ReportFilters({
  filters,
  projects,
  columnFilters,
  onToggleProject,
}: ReportFiltersProps) {
  const onFilterToggle = useCallback((name: string) => (e: Event) => {
    // prevent closing dropdown
    e.stopPropagation();

    onToggleProject(name === '' ? null : name);
  }, [onToggleProject]);

  return (
    <div className="Report__filters">
      <Dropdown text="Filter projects" closeOnBlur={false} style={{ marginRight: '2em' }}>
        <Dropdown.Menu>
          {projects.map((project, index) => (
            <Fragment key={project.id}>
              {index > 0 && project.nameTree.length === 1 && <Dropdown.Divider />}
              <Dropdown.Item onClick={onFilterToggle(project.id)}>
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

export default ReportFilters;
