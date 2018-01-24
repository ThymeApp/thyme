// @flow

import React from 'react';
import { Pie } from 'react-chartjs-2';

import { formatDuration } from '../../core/thyme';

import Colours from './Colours';

type ReportChartsType = {
  projects: Array<projectTreeType & { time: number }>,
};

function ReportCharts({ projects }: ReportChartsType) {
  const projectsWithTime = projects.filter(project => project.time > 0);

  const data = {
    labels: projectsWithTime.map(project => project.name),
    datasets: [{
      data: projectsWithTime.map(project => project.time),
      backgroundColor: [...Colours],
    }],
  };

  return (
    <div>
      <Pie
        data={data}
      />
    </div>
  );
}

export default ReportCharts;
