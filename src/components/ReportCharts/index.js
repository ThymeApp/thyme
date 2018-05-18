// @flow

import React from 'react';
import PieChart from 'react-svg-piechart';

import Colours from './Colours';

import './ReportCharts.css';

type ReportChartsType = {
  projects: Array<projectTreeWithTimeType>,
};

function ReportCharts({ projects }: ReportChartsType) {
  const projectsWithTime = projects.filter(project => project.time > 0);

  if (projectsWithTime.length === 0) {
    return null;
  }

  return (
    <div className="ReportCharts">
      <div className="ReportCharts__Charts">
        <PieChart
          viewBoxSize={300}
          strokeWidth={3}
          data={projectsWithTime.map((project, index) => ({
            title: project.name,
            value: Math.round(project.time),
            color: Colours[index],
          }))}
        />
      </div>
      <ul className="ReportCharts__Legend">
        {projectsWithTime.map((project, index) => (
          <li key={project.id}>
            <span
              className="ReportCharts__Legend-Colour"
              style={{ borderColor: Colours[index] }}
            />
            { project.name }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportCharts;
