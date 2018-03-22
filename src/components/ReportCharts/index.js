// @flow

import React from 'react';
import { Pie } from 'react-chartjs-2';

import { formatDuration } from '../../core/thyme';

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

  const data = {
    labels: projectsWithTime.map(project => project.name),
    datasets: [{
      data: projectsWithTime.map(project => project.time),
      backgroundColor: [...Colours],
    }],
  };

  return (
    <div className="ReportCharts">
      <Pie
        height={300}
        data={data}
        options={{
          responsive: false,
          tooltips: {
            callbacks: {
              label: (tooltip) => {
                const label = data.labels[tooltip.index];
                const value = data.datasets[0].data[tooltip.index] * 60;

                return `${label}: ${formatDuration(value)}`;
              },
            },
          },
        }}
      />
    </div>
  );
}

export default ReportCharts;
