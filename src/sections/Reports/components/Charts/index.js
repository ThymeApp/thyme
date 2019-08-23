// @flow

import React from 'react';
import PieChart from 'react-svg-piechart';

import { treeDisplayName } from 'core/projects';

import { projectColour } from 'sections/Projects/colours';

import './ReportCharts.css';

type ReportChartsType = {
  projects: Array<ProjectTreeWithTimeType>,
};

function ReportCharts({ projects }: ReportChartsType) {
  const projectsWithTime = projects.filter((project) => project.time > 0);

  if (projectsWithTime.length === 0) {
    return (
      <div className="ReportCharts--empty">
        No data available in this data range
      </div>
    );
  }

  return (
    <div className="ReportCharts">
      <div className="ReportCharts__Charts">
        <PieChart
          viewBoxSize={300}
          strokeWidth={3}
          data={projectsWithTime.map((project, index) => ({
            title: treeDisplayName(project),
            value: Math.round(project.time),
            color: projectColour(project, index),
          }))}
        />
      </div>
      <ul className="ReportCharts__Legend">
        {projectsWithTime.map((project, index) => (
          <li key={project.id}>
            <span
              className="ReportCharts__Legend-Colour"
              style={{ borderColor: projectColour(project, index) }}
            />
            {treeDisplayName(project)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportCharts;
