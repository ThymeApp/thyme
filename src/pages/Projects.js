import React from 'react';
import { connect } from 'react-redux';

import NewProject from '../components/NewProject';

function Projects({ projects }) {
  return (
    <div>
      <h2>Projects</h2>

      <section>
        <NewProject />
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(Projects);
