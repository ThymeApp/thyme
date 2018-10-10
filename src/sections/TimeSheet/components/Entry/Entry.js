// @flow

import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';
import isEqual from 'date-fns/is_equal';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import parse from 'date-fns/parse';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';

import { saveTemporaryItem, clearTemporaryItem } from 'core/localStorage';
import { timeElapsed } from 'core/thyme';
import { valueFromEventTarget } from 'core/dom';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
import NotesInput from '../NotesInput/index';

import './Entry.css';

function defaultState(props = {}, now: Date): timePropertyType {
  const defaultStart = startOfDay(now);

  return {
    start: props.start || defaultStart,
    end: props.end || defaultStart,
    project: props.project || null,
    notes: props.notes || '',
  };
}

type EntryProps = {
  now: Date;
  entry?: timeType;
  tempEntry?: tempTimePropertyType;
  round?: rounding;
  roundAmount?: number;
  onAdd?: (entry: timePropertyType) => void;
  onRemove?: (id: string) => void;
  onUpdate?: (entry: timePropertyType) => void;
  onAddNewProject?: (project: string) => string;
};

type EntryState = {
  entry: timePropertyType;
  tracking: boolean;
  confirm: boolean;
};

class Entry extends Component<EntryProps, EntryState> {
  constructor(props: EntryProps) {
    super(props);

    this.state = {
      entry: defaultState(props.entry || props.tempEntry, props.now),
      tracking: props.tempEntry ? props.tempEntry.tracking : false,
      confirm: false,
    };
  }

  componentDidMount() {
    this.tickInterval = setInterval(this.tickTimer.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  onDateChange = (e: Event) => this.onStartDateChange(valueFromEventTarget(e.target));

  onStartTimeChange = (e: Event) => this.onTimeChange('start', valueFromEventTarget(e.target));

  onEndTimeChange = (e: Event) => this.onTimeChange('end', valueFromEventTarget(e.target));

  onProjectChange = (e: Event, project: { value: string | null, label: string }) => (
    this.onValueChange(
      'project',
      project === null ? null : project.value,
    )
  );

  onNotesChange = (e: Event) => this.onValueChange('notes', valueFromEventTarget(e.target));

  onAddNewProject = (e: Event, project: { value: string }) => this.addNewProject(project.value);

  onOpenConfirm = () => { this.setState({ confirm: true }); };

  onCancelConfirm = () => { this.setState({ confirm: false }); };

  onSetDateInputRef = (input: HTMLInputElement | null) => { this.dateInput = input; };

  onStartDateChange(value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.state;

    const start = parse(`${value} ${format(entry.start, 'HH:mm')}`);
    const end = parse(`${value} ${format(entry.end, 'HH:mm')}`);

    this.updateEntry({
      start,
      end,
    });

    this.setState({
      entry: {
        ...entry,
        start,
        end,
      },
    });
  }

  onTimeChange(key: string, value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.state;

    const [hours, minutes] = value.split(':');
    const newDate = setHours(
      setMinutes(
        entry[key],
        parseInt(minutes, 10),
      ),
      parseInt(hours, 10),
    );

    this.onValueChange(key, newDate);
  }

  onValueChange(key: string, value: string | Date | null) {
    this.updateEntry({
      [key]: value,
    });

    const { entry } = this.state;

    this.setState({
      entry: {
        ...entry,
        [key]: value,
      },
    });
  }

  onStartTimeTracking = () => {
    const { now } = this.props;
    const { entry } = this.state;

    const startTime = new Date();

    this.setState({
      tracking: true,
      entry: {
        ...entry,
        start: isEqual(entry.start, startOfDay(now)) ? startTime : entry.start,
        end: startTime,
      },
    });
  };

  onStopTimeTracking = () => {
    const { entry } = this.state;

    this.setState({
      tracking: false,
    });

    // stop tracking in localStorage
    saveTemporaryItem({ ...entry, tracking: false });
  };

  onAddEntry = () => {
    const { now, onAdd } = this.props;
    const { entry } = this.state;

    if (typeof onAdd === 'function') {
      onAdd({
        ...entry,
      });

      // put focus back on date input
      if (this.dateInput) {
        this.dateInput.focus();
      }

      // reset item
      this.setState({
        tracking: false,
        entry: defaultState({}, now),
      });

      // clear item from localStorage
      clearTemporaryItem();
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    const { entry } = this.props;
    // check if return is pressed
    if (e.key && e.key === 'Enter' && !entry) {
      this.onAddEntry();
    }
  };

  onRemoveEntry = () => {
    const { entry, onRemove } = this.props;

    // close the confirm
    this.onCancelConfirm();

    if (
      entry && entry.id
      && typeof onRemove === 'function'
    ) {
      onRemove(entry.id);
    }
  };

  updateEntry(newState: any) {
    const { entry, onUpdate } = this.props;
    const { entry: stateEntry } = this.state;

    if (typeof onUpdate === 'function' && entry && entry.id) {
      onUpdate({
        id: entry.id,
        ...stateEntry,
        ...newState,
      });
    }
  }

  addNewProject(project: string) {
    const { onAddNewProject } = this.props;
    const { entry } = this.state;

    const newProject = project.trim();

    if (newProject === '') {
      return;
    }

    if (onAddNewProject) {
      this.setState({
        entry: {
          ...entry,
          project: onAddNewProject(project),
        },
      });
    }
  }

  tickTimer() {
    const { tracking, entry: stateEntry } = this.state;

    if (tracking) {
      const entry = {
        ...stateEntry,
        end: new Date(),
      };

      // update state of component
      this.setState({ entry });

      // save temporary state to localStorage
      saveTemporaryItem({ ...entry, tracking });
    }
  }

  dateInput: HTMLInputElement | null;

  tickInterval: IntervalID;

  render() {
    const { entry, round, roundAmount } = this.props;
    const {
      tracking,
      confirm,
      entry: stateEntry,
    } = this.state;
    const {
      start,
      end,
      project,
      notes,
    } = stateEntry;

    const hasId = Boolean(entry && !!entry.id);
    const [hours, minutes, seconds] = (
      timeElapsed(start, end, tracking, true, round, roundAmount)
      || '00:00:00'
    ).split(':');

    const StartDate = (
      <DateInput
        setRef={this.onSetDateInputRef}
        onKeyPress={this.onKeyPress}
        onChange={this.onDateChange}
        value={format(start, 'YYYY-MM-DD')}
      />
    );

    const StartTime = (
      <TimeInput
        onKeyPress={this.onKeyPress}
        onChange={this.onStartTimeChange}
        value={format(start, 'HH:mm')}
      />
    );

    const EndTime = (
      <TimeInput
        onKeyPress={this.onKeyPress}
        onChange={this.onEndTimeChange}
        value={format(end, 'HH:mm')}
      />
    );

    const Duration = (
      <Fragment>
        {hours}
        :
        {minutes}
        {tracking && (
          <Fragment>
            :
            {seconds}
          </Fragment>
        )}
      </Fragment>
    );

    const Project = (
      <ProjectInput
        value={project}
        onAddItem={this.onAddNewProject}
        handleChange={this.onProjectChange}
      />
    );

    const Notes = (
      <NotesInput
        onKeyPress={this.onKeyPress}
        onChange={this.onNotesChange}
        value={notes}
      />
    );

    const Actions = (
      <Button.Group size="small">
        {!hasId && (
          <Fragment>
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
              <Button
                icon
                color="blue"
                onClick={tracking ? this.onStopTimeTracking : this.onStartTimeTracking}
                labelPosition="left"
              >
                <Icon name={tracking ? 'pause' : 'play'} />
                {tracking ? 'Stop tracking time' : 'Start time tracking'}
              </Button>

              <Button
                className="EntrySubmit"
                icon
                onClick={this.onAddEntry}
                labelPosition="right"
              >
                <Icon name="add" />
                Add this entry
              </Button>
            </Responsive>
            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
              <Popup
                inverted
                trigger={(
                  <Button
                    icon
                    color="blue"
                    onClick={tracking ? this.onStopTimeTracking : this.onStartTimeTracking}
                  >
                    <Icon name={tracking ? 'pause' : 'play'} />
                  </Button>
                )}
                content={tracking ? 'Stop tracking time' : 'Start time tracking'}
              />
              <Popup
                inverted
                trigger={(
                  <Button
                    className="EntrySubmit"
                    icon
                    onClick={this.onAddEntry}
                  >
                    <Icon name="add" />
                  </Button>
                )}
                content="Add this entry"
              />
            </Responsive>
          </Fragment>
        )}
        {hasId && (
          <Fragment>
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
              <Button icon onClick={this.onOpenConfirm} labelPosition="left">
                <Icon name="remove" />
                Remove entry
              </Button>
            </Responsive>
            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
              <Popup
                inverted
                trigger={(
                  <Button icon onClick={this.onOpenConfirm}>
                    <Icon name="remove" />
                  </Button>
                )}
                content="Remove this entry"
              />
            </Responsive>

            <Confirm
              open={confirm}
              content="Are you sure you want to remove this entry?"
              confirmButton="Remove entry"
              size="mini"
              onCancel={this.onCancelConfirm}
              onConfirm={this.onRemoveEntry}
            />
          </Fragment>
        )}
      </Button.Group>
    );

    const TableEntry = (
      <Table.Row className={classnames({ 'TableRow--tracking': tracking })}>
        <Table.Cell width={1}>{StartDate}</Table.Cell>
        <Table.Cell width={1}>{StartTime}</Table.Cell>
        <Table.Cell width={1}>{EndTime}</Table.Cell>
        <Table.Cell className="EntryDuration" width={1}>{Duration}</Table.Cell>
        <Table.Cell width={3}>{Project}</Table.Cell>
        <Table.Cell className="EntryNotes">{Notes}</Table.Cell>
        <Table.Cell textAlign="right" style={{ width: 1, whiteSpace: 'nowrap' }}>
          {Actions}
        </Table.Cell>
      </Table.Row>
    );

    const CompactEntry = (
      <Form className={classnames('Entry', { 'Entry--tracking': tracking })}>
        <div className="EntryDuration">
          <Icon name="stopwatch" color={tracking ? 'blue' : 'black'} />
          {Duration}
        </div>
        <Form.Group className="EntryDurationContainer">
          <Form.Field>
            {StartDate}
          </Form.Field>
          <Form.Field>
            {StartTime}
          </Form.Field>
          <Form.Field>
            {EndTime}
          </Form.Field>
        </Form.Group>
        {Project}
        {Notes}
        {Actions}
      </Form>
    );

    return (
      <Fragment>
        <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
          {CompactEntry}
        </Responsive>
        <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          {TableEntry}
        </Responsive>
      </Fragment>
    );
  }
}

export default Entry;
