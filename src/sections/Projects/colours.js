// @flow

export const colourMap: { [key: ProjectColour]: string } = {
  red: '#db2828',
  blue: '#2185d0',
  yellow: '#fbbd08',
  green: '#21ba45',
  pink: '#e03997',
  teal: '#00b5ad',
  olive: '#b5cc18',
  orange: '#f2711c',
  purple: '#a333c8',
  brown: '#a5673f',
  violet: '#6435c9',
  black: '#1b1c1d',
  grey: '#767676',
};

export const colours: ProjectColour[] = [
  'red',
  'blue',
  'yellow',
  'green',
  'pink',
  'teal',
  'olive',
  'orange',
  'purple',
  'brown',
  'violet',
  'black',
  'grey',
];

export function projectColour(project: ProjectType, index?: number): string {
  if (typeof index !== 'undefined') {
    return colourMap[project.colour || colours[index % colours.length]];
  }

  return colourMap[project.colour || 'grey'];
}
