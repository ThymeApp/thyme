// @flow

import React from 'react';
import PieChart from 'react-svg-piechart';

import './ReportCharts.css';

type ReportChartsType = {
  projects: Array<ProjectTreeWithTimeType>,
};

export const colours = [
  '#00AA55',
  '#009FD4',
  '#B381B3',
  '#EF4836',
  '#AA8F00',
  '#D47500',
  '#939393',
];

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
            color: colours[index],
          }))}
        />
      </div>
      <ul className="ReportCharts__Legend">
        {projectsWithTime.map((project, index) => (
          <li key={project.id}>
            <span
              className="ReportCharts__Legend-Colour"
              style={{ borderColor: colours[index] }}
            />
            { project.nameTree.join(' > ') }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportCharts;
