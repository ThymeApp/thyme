import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addProject, updateProject, removeProject } from '../actions/projects';

import NewProject from '../components/NewProject';

function Projects({ onAddProject }) {
  return (
    <div>
      <h2>Projects</h2>

      <section>
        <NewProject onAddProject={onAddProject} />
      </section>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onAddProject(project) {
      dispatch(addProject({
        ...project,
        id: shortid.generate(),
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(Projects);
