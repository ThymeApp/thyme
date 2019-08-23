// @flow

import React, { useState, useCallback } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import { valueFromEventTarget } from 'core/dom';
import { useActions } from 'core/useActions';

import { useResponsive } from 'components/Responsive';

import ProjectInput from '../ProjectInput';
import ProjectColourPicker from '../ProjectColourPicker';

import { addProject } from '../../actions';

import { defaultColour } from '../../colours';

function defaultState() {
  return {
    colour: defaultColour,
    name: '',
    parent: null,
  };
}

function useNewProjectState(defaultProject = defaultState()) {
  const [colour, setColour] = useState<ProjectColour>(defaultProject.colour);
  const [name, setName] = useState<string>(defaultProject.name);
  const [parent, setParent] = useState<string | null>(defaultProject.parent);

  function resetState() {
    setColour(defaultProject.colour);
    setName(defaultProject.name);
    setParent(defaultProject.parent);
  }

  return {
    colour,
    name,
    parent,
    setColour,
    setName,
    setParent,
    resetState,
  };
}

function NewProject() {
  const {
    colour,
    name,
    parent,
    setColour,
    setName,
    setParent,
    resetState,
  } = useNewProjectState();
  const [showLabels] = useResponsive({ max: 'tablet' });
  const onAddProject = useActions(useCallback((project) => addProject({ ...project }), []));

  const onSubmit = useCallback(() => {
    if (name.trim() === '') {
      return;
    }

    onAddProject({
      colour,
      name,
      parent,
    });

    resetState();
  }, [name, colour, parent, onAddProject, resetState]);

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
          <Form.Field width={2}>
            {showLabels && (
              <label htmlFor="project-colour">
                Colour
              </label>
            )}
            <ProjectColourPicker colour={colour} onChange={setColour} />
          </Form.Field>
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

export default NewProject;
