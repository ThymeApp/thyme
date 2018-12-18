// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Projects = lazy(() => import('./Projects.js'));

function ProjectsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Projects />
    </Suspense>
  );
}

export default ProjectsPage;
