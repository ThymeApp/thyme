// @flow

import React from 'react';
import { connect } from 'react-redux';

import { sortedProjects } from '../../core/projects';

import './Reports.css';

function Reports({ projects }) {
  return (
    <div>
      <div className="Report__header">
        <h2 className="Report__title">This week</h2>
        <span className="Report__header-date">(15-21 January 2018)</span>
        <div className="Report__period">
          <select name="period">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
      </div>
      <div className="Report__filters">
        {sortedProjects(projects).map(project => (
          <label className="Report__filter" key={project.id} htmlFor={project.id}>
            <span className="Report__filter-name">{project.name}</span>
            <input defaultChecked type="checkbox" name={project.id} id={project.id} />
          </label>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(Reports);
