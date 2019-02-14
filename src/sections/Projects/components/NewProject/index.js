// @flow

import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import { valueFromEventTarget } from 'core/dom';

import { useResponsive } from 'components/Responsive';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import { addProject } from '../../actions';

function defaultState() {
  return {
    name: '',
    parent: null,
  };
}

type NewProjectState = {
  name: string,
  parent: string | null,
};

type NewProjectProps = {
  onAddProject: (project: NewProjectState) => void,
};

function useNewProjectState(defaultProject = defaultState()) {
  const [name, setName] = useState<string>(defaultProject.name);
  const [parent, setParent] = useState<string | null>(defaultProject.parent);

  function resetState() {
    setName(defaultProject.name);
    setParent(defaultProject.parent);
  }

  return [name, parent, setName, setParent, resetState];
}

function NewProject({ onAddProject }: NewProjectProps) {
  const [name, parent, setName, setParent, resetState] = useNewProjectState();
  const [showLabels] = useResponsive({ max: 'tablet' });

  const onSubmit = useCallback(() => {
    if (name.trim() === '') {
      return;
    }

    onAddProject({
      name,
      parent,
    });

    resetState();
  }, [name, parent, onAddProject, resetState]);

  const onNameChange = useCallback(
    (e: Event) => setName(valueFromEventTarget(e.target)),
    [setName],
  );

  const onProjectChange = useCallback(
    (value: string | null) => setParent(value),
    [setParent],
  );

  return (
    <div className="NewProject">
      <Form onSubmit={onSubmit}>
        <Form.Group widths="equal">
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
                onChange={onNameChange}
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
                handleChange={onProjectChange}
                value={parent}
              />
            </Form.Field>
          </Fragment>
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
