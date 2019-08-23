import { sortProjects } from '../../core/projects';

describe('Sort projects', () => {
  it('Sorts given projects by name and hierarchy', () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const projects = [
      {
        id: '1',
        parent: null,
        name: 'Main Project',
        createdAt,
        updatedAt,
      },
      {
        id: '2',
        parent: null,
        name: 'Another Project',
        createdAt,
        updatedAt,
      },
      {
        id: '3',
        parent: '1',
        name: 'Sub Project',
        createdAt,
        updatedAt,
      },
      {
        id: '4',
        parent: '1',
        name: 'Before Sub Project',
        createdAt,
        updatedAt,
      },
      {
        id: '5',
        parent: '4',
        name: 'Sub Project',
        createdAt,
        updatedAt,
      },
      {
        id: '6',
        parent: '4',
        name: 'Before Sub Project',
        createdAt,
        updatedAt,
      },
      {
        id: '7',
        parent: null,
        name: 'Main Project (2)',
        createdAt,
        updatedAt,
      },
    ];
    const sorted = sortProjects(projects).map((item) => item.id);

    expect(sorted).toEqual(['2', '1', '4', '6', '5', '3', '7']);
  });
});
