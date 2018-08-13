// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { valueFromEventTarget } from '../../core/dom';

import { addProject } from '../../actions/projects';

import ProjectInput from '../ProjectInput';

import './NewProject.css';

function defaultState() {
  return {
    name: '',
    parent: null,
  };
}

type NewProjectStateType = {
  name: string,
  parent: string | null,
};

type NewProjectType = {
  onAddProject: (project: NewProjectStateType) => void,
};

class NewProject extends Component<NewProjectType, NewProjectStateType> {
  state = defaultState();

  onNameChange = (e: Event) => this.onValueChange('name', valueFromEventTarget(e.target));

  onProjectChange = (e: Event, project: { value: string, label: string }) => this.onValueChange(
    'parent', project === null ? null : project.value,
  );

  onSubmit = () => this.addNew();

  onValueChange(key: string, value: string | null) {
    this.setState({
      [key]: value,
    });
  }

  onKeyPress = (e: KeyboardEvent) => {
    // check if return is pressed
    if (e.charCode && e.charCode === 13) {
      this.addNew();
    }
  };

  addNew() {
    const { onAddProject } = this.props;
    const { name } = this.state;

    if (name.trim() === '') {
      return;
    }

    onAddProject({
      ...this.state,
    });

    this.setState(defaultState());
  }

  render() {
    const { name, parent } = this.state;

    return (
      <div className="NewProject">
        <Input
          id="project-name"
          name="project-name"
          className="NewProject__input"
          type="text"
          placeholder="Project name"
          value={name}
          onChange={this.onNameChange}
          onKeyPress={this.onKeyPress}
          style={{ marginRight: 12 }}
        />
        <ProjectInput placeholder="Select parent..." handleChange={this.onProjectChange} value={parent} />
        <Button style={{ marginLeft: 12 }} color="blue" onClick={this.onSubmit}>
          Add project
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddProject(project) {
      dispatch(addProject({
        ...project,
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(NewProject);
