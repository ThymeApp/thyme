// @flow

import JsPDF from 'jspdf';
import 'jspdf-autotable';
import canvg from 'canvg';

import { formatDate } from 'core/intl';
import { treeDisplayName } from 'core/projects';

import { projectColour } from 'sections/Projects/colours';

type downloadPdfProps = {
  from: Date;
  to: Date;
  projects: ProjectTreeWithTimeType[];
  report: ReportType | null;
};

function createChartImage(doc, projects) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const svg = document.querySelector('.ReportCharts__Charts svg');

  if (svg) {
    canvg(canvas, svg ? svg.innerHTML : '');
    const img = canvas.toDataURL('image/png');

    doc.addImage(img, 'image/png', 10, 20, 70, 70);

    projects.forEach((project, index) => {
      const y = 22 + (index * 6);
      doc.text(treeDisplayName(project), 100, y + 2, { baseline: 'middle' });
      doc.setFillColor(projectColour(project, index));
      doc.rect(88, y, 10, 4, 'F');
    });
  }

  return !!svg;
}

export default function downloadPdf({
  from,
  to,
  projects,
  report,
}: downloadPdfProps) {
  const doc = new JsPDF();

  doc.setFontSize(14);
  doc.text(`Thyme Report from ${formatDate(from)} to ${formatDate(to)}`, 10, 10);
  doc.setFontSize(10);

  const addedChart = createChartImage(doc, projects);

  doc.autoTable({
    html: '.ReportsTable',
    startY: addedChart ? 100 : 20,
  });

  const { finalY } = doc.autoTable.previous;

  doc.autoTable({
    html: '.ReportDetailed table',
    startY: finalY + 10,
  });

  doc.save(`Thyme Report${report && report.name ? ` ${report.name}` : ''}.pdf`);
}
