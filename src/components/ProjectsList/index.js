// @flow

import React from 'react';
import type { Element } from 'react';

import ProjectsList from './ProjectsList';

function projectsListWrapper({ projects }: { projects: Array<projectTreeType> }): Element<any> {
  return (
    <table className="ProjectList">
      <tbody>
        <ProjectsList projects={projects} />
      </tbody>
    </table>
  );
};

export default projectsListWrapper;
