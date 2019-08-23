import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Projects from 'sections/Projects/Projects';

import createStore from '../../createStore';

describe('NewProject', () => {
  const store = createStore();
  const page = mount(
    <Provider store={store}>
      <Projects />
    </Provider>,
  );
  const wrapper = page.find('NewProject');

  it('renders new project input without crashing', () => {
    expect(wrapper.find('input[name="project-name"]').length).toBe(1);
  });

  it('Add project to store', () => {
    const projectName = wrapper.find('input[name="project-name"]');
    const form = wrapper.find('form');

    // change event target need to be a real input
    const target = document.createElement('input');
    target.value = 'Test project';

    projectName.simulate('change', { target });
    form.simulate('submit');

    const state = store.getState();

    expect(state.projects.allIds.length).toBe(1);
    expect(state.projects.allIds.map((id) => state.projects.byId[id])[0].name).toBe('Test project');
  });

  it('Add project with parent', () => {
    // fill in test project
    const projectName = wrapper.find('input[name="project-name"]');
    const projectParent = wrapper.find('ProjectInput');
    const form = wrapper.find('form');

    const prevState = store.getState();
    const target = document.createElement('input');
    target.value = 'Child project';
    const parent = prevState.projects.allIds.map((id) => prevState.projects.byId[id])[0];

    projectName.simulate('change', { target });
    projectParent.prop('handleChange')(parent.id);
    form.simulate('submit');

    const state = store.getState();
    const projects = state.projects.allIds.map((id) => state.projects.byId[id]);

    expect(state.projects.allIds.length).toBe(2);
    expect(projects[1].name).toBe('Child project');
    expect(projects[1].parent).toBe(projects[0].id);
  });
});

describe('ProjectsList', () => {
  const store = createStore({
    projects: {
      byId: {
        1: {
          id: 1,
          parent: null,
          name: 'Company',
        },
        2: {
          id: 2,
          parent: 1,
          name: 'Project',
        },
        3: {
          id: 3,
          parent: null,
          name: 'Another company',
        },
      },
      allIds: [1, 2, 3],
    },
  });
  const wrapper = mount(
    <Provider store={store}>
      <Projects />
    </Provider>,
  );

  it('renders the projects correctly', () => {
    expect(wrapper.find('tr.ProjectList__item').length).toBe(3);
    expect(wrapper.find('td.ProjectList__level-2').length).toBe(1);
  });
});
