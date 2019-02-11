// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import { valueFromEventTarget } from 'core/dom';

import Responsive from 'components/Responsive';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import { addProject } from '../../actions';

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

  onProjectChange = (value: string | null) => this.onValueChange('parent', value);

  onSubmit = () => this.addNew();

  onValueChange(key: string, value: string | null) {
    this.setState({
      [key]: value,
    });
  }

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
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths="equal">
            <Responsive max="tablet">
              {showLabels => (
                <Fragment>
                  <Form.Field>
                    {showLabels && (
                      <label htmlFor="project-name">
                        Project name
                      </label>
                    )}
                    <Input
                      id="project-name"
                      name="project-name"
                      className="NewProject__input"
                      type="text"
                      placeholder="Project name"
                      value={name}
                      onChange={this.onNameChange}
                      style={{ marginRight: 12 }}
                    />
                  </Form.Field>
                  <Form.Field>
                    {showLabels && (
                      <label>
                        Parent project
                      </label>
                    )}
                    <ProjectInput
                      placeholder="Select parent..."
                      handleChange={this.onProjectChange}
                      value={parent}
                    />
                  </Form.Field>
                </Fragment>
              )}
            </Responsive>
            <Form.Field width={8}>
              <Button
                icon="add"
                color="blue"
                fluid
                type="submit"
                content="Add project"
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onAddProject(project) {
      dispatch(addProject({
        ...project,
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(NewProject);
