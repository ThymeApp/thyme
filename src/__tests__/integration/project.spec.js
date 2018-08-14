import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import createStore from '../../createStore';

import NewProject from '../../components/NewProject';

describe('NewProject', () => {
  const store = createStore();
  const wrapper = mount(
    <Provider store={store}>
      <NewProject />
    </Provider>,
  );

  it('renders new project input without crashing', () => {
    expect(wrapper.find('input[name="project-name"]').length).toBe(1);
  });

  it('Add project to store', () => {
    // fill in test project
    const projectName = wrapper.find('input[name="project-name"]');
    const submit = wrapper.find('button');

    const target = document.createElement('input');
    target.value = 'Test project';

    projectName.simulate('change', { target });
    submit.simulate('click');

    const state = store.getState();

    expect(state.projects.allIds.length).toBe(1);
    expect(state.projects.allIds.map(id => state.projects.byId[id])[0].name).toBe('Test project');
  });

  it('Add project with parent', () => {
    // fill in test project
    const projectName = wrapper.find('input[name="project-name"]');
    const projectParent = wrapper.find('ProjectInput');
    const submit = wrapper.find('button');

    const prevState = store.getState();
    const target = document.createElement('input');
    target.value = 'Child project';
    const project = prevState.projects.allIds.map(id => prevState.projects.byId[id])[0];

    projectName.simulate('change', { target });
    projectParent.prop('handleChange')(null, { value: project.id, label: project.name });
    submit.simulate('click');

    const state = store.getState();
    const projects = state.projects.allIds.map(id => state.projects.byId[id]);

    expect(state.projects.allIds.length).toBe(2);
    expect(projects[1].name).toBe('Child project');
    expect(projects[1].parent).toBe(projects[0].id);
  });
});
