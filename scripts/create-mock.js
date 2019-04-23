const fs = require('fs');
const path = require('path');

const { addDays, setHours, setMinutes } = require('date-fns');

const projects = [
  {
    id: 'project-1',
    parent: null,
    name: 'Some client',
    removed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'project-2',
    parent: 'project-1',
    name: 'Project-X',
    removed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'project-3',
    parent: 'project-1',
    name: 'Top Secret!',
    removed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'project-4',
    parent: null,
    name: 'Personal project',
    removed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const notes = [
  'Random stuff',
  'Some stuff I have done today',
  'Planning and organising',
  'Work work',
  'Job\'s done',
];

let idIncrement = 0;
function generateTime(start, end) {
  const rand = Math.round(Math.random() * 10);
  const note = rand < notes.length ? notes[rand] : '';

  idIncrement += 1;

  return {
    id: `time-${idIncrement}`,
    project: Math.round(rand / 2) > 3 ? null : projects[Math.round(rand / 2)].id,
    start,
    end,
    notes: note,
    removed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function makeTime(days, hours, minutes) {
  return setMinutes(setHours(addDays(new Date(), days), hours), minutes);
}

const time = [
  generateTime(makeTime(-14, 9, 0), makeTime(-14, 12, 0)),
  generateTime(makeTime(-14, 13, 0), makeTime(-14, 15, 0)),
  generateTime(makeTime(-13, 10, 0), makeTime(-13, 11, 45)),
  generateTime(makeTime(-12, 9, 0), makeTime(-12, 12, 0)),
  generateTime(makeTime(-12, 13, 0), makeTime(-12, 15, 0)),
  generateTime(makeTime(-10, 9, 0), makeTime(-10, 12, 0)),
  generateTime(makeTime(-10, 13, 30), makeTime(-10, 17, 0)),
  generateTime(makeTime(-9, 10, 30), makeTime(-9, 13, 0)),
  generateTime(makeTime(-9, 15, 0), makeTime(-9, 17, 0)),
  generateTime(makeTime(-8, 9, 0), makeTime(-8, 11, 0)),
  generateTime(makeTime(-8, 13, 0), makeTime(-8, 15, 0)),
  generateTime(makeTime(-7, 13, 0), makeTime(-7, 16, 0)),
  generateTime(makeTime(-6, 8, 30), makeTime(-6, 14, 45)),
  generateTime(makeTime(-5, 8, 30), makeTime(-5, 11, 45)),
  generateTime(makeTime(-5, 13, 0), makeTime(-5, 17, 0)),
  generateTime(makeTime(-4, 13, 0), makeTime(-4, 17, 0)),
  generateTime(makeTime(-3, 8, 30), makeTime(-3, 11, 45)),
  generateTime(makeTime(-3, 13, 0), makeTime(-3, 17, 0)),
  generateTime(makeTime(-2, 9, 0), makeTime(-2, 12, 0)),
  generateTime(makeTime(-2, 13, 0), makeTime(-2, 15, 0)),
  generateTime(makeTime(-1, 10, 30), makeTime(-1, 13, 0)),
  generateTime(makeTime(-1, 15, 0), makeTime(-1, 17, 0)),
];

const jsonFile = JSON.stringify({
  projects,
  time,
});

fs.writeFile(path.resolve(__dirname, '../sample.json'), jsonFile, 'utf8', (e) => {
  if (e) throw e;

  // eslint-disable-next-line no-console
  console.info('Successfully saved sample data in "sample.json"');
});
