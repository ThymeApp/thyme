// @flow

import React, { Component, Fragment } from 'react';
import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';
import isEqual from 'date-fns/is_equal';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import parse from 'date-fns/parse';
import { Table, Confirm, Button, Icon, Popup } from 'semantic-ui-react';
import classnames from 'classnames';

import { saveTemporaryItem, clearTemporaryItem } from '../../core/localStorage';
import { timeElapsed } from '../../core/thyme';
import { valueFromEventTarget } from '../../core/dom';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
import ProjectInput from '../ProjectInput';
import NotesInput from '../NotesInput';

import './Entry.css';

const defaultStart = startOfDay(new Date());

function defaultState(props = {}): timePropertyType {
  return {
    start: props.start || defaultStart,
    end: props.end || defaultStart,
    project: props.project || null,
    notes: props.notes || '',
  };
}

type EntryType = {
  entry?: timeType,
  tempEntry?: tempTimePropertyType,
  onAdd?: (entry: timePropertyType) => void,
  onRemove?: (id: string) => void,
  onUpdate?: (entry: timePropertyType) => void,
  onAddNewProject?: (project: string) => string,
};

type EntryStateType = {
  entry: timePropertyType,
  tracking: boolean,
  confirm: boolean,
  rounding: number,
};

class Entry extends Component<EntryType, EntryStateType> {
  constructor(props: EntryType) {
    super(props);

    this.onDateChange = e => this.onStartDateChange(valueFromEventTarget(e.target));
    this.onStartTimeChange = e => this.onTimeChange('start', valueFromEventTarget(e.target));
    this.onEndTimeChange = e => this.onTimeChange('end', valueFromEventTarget(e.target));
    this.onStartTimeBlur = e => this.onTimeBlur('start', valueFromEventTarget(e.target));
    this.onEndTimeBlur = e => this.onTimeBlur('end', valueFromEventTarget(e.target));

    this.onProjectChange =
      (e, project) => this.onValueChange('project', project === null ? null : project.value);
    this.onNotesChange = e => this.onValueChange('notes', valueFromEventTarget(e.target));
    this.onAddNewProject = (e, project) => this.addNewProject(project.value);

    this.onAddEntry = this.addEntry.bind(this);
    this.onRemoveEntry = this.removeEntry.bind(this);
    this.onKeyPress = this.keyPress.bind(this);
    this.onOpenConfirm = () => { this.setState({ confirm: true }); };
    this.onCancelConfirm = () => { this.setState({ confirm: false }); };

    this.onStartTimeTracking = this.startTimeTracking.bind(this);
    this.onStopTimeTracking = this.stopTimeTracking.bind(this);

    this.onSetDateInputRef = (input) => { this.dateInput = input; };

    this.state = {
      entry: defaultState(props.entry || props.tempEntry),
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

  onDateChange: (e: Event) => void;
  onStartTimeChange: (e: Event) => void;
  onEndTimeChange: (e: Event) => void;
  onStartTimeBlur: (e: Event) => void;
  onEndTimeBlur: (e: Event) => void;
  onProjectChange: (e: Event, project: { value: string, label: string }) => void;
  onNotesChange: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
  onAddEntry: () => void;
  onRemoveEntry: () => void;
  onSetDateInputRef: (input: HTMLInputElement | null) => void;
  onStartTimeTracking: () => void;
  onStopTimeTracking: () => void;
  onAddNewProject: (e: Event, project: { value: string }) => void;
  onOpenConfirm: () => void;
  onCancelConfirm: () => void;

  onStartDateChange(value: string | null) {
    if (!value) {
      return;
    }

    const start = parse(`${value} ${format(this.state.entry.start, 'HH:mm')}`);
    const end = parse(`${value} ${format(this.state.entry.end, 'HH:mm')}`);

    this.updateEntry({
      start,
      end,
    });

    this.setState({
      entry: {
        ...this.state.entry,
        start,
        end,
      },
    });
  }

  onTimeChange(key: string, value: string | null) {
    if (!value) {
      return;
    }

    const [hours, minutes] = value.split(':');
    const newDate =
      setHours(
        setMinutes(
          this.state.entry[key],
          parseInt(minutes, 10),
        ),
        parseInt(hours, 10),
      );

    this.onValueChange(key, newDate);
  }

  onTimeBlur(key: string, value: string)
  {
    if (!value) {
      return;
    }

    let [hours, minutes] = value.split(':');
    minutes = parseInt(minutes, 10);
    hours = parseInt(hours, 10);
    const dividedMins = minutes / 15;
    if (dividedMins % 1 > 0.5) {
      minutes = Math.ceil(minutes / 15) * 15;
    }
    else {
      minutes = Math.floor(minutes / 15) * 15;
    }
    hours = minutes === 60 ? hours + 1 : hours;
    const newDate =
      setHours(
        setMinutes(
          this.state.entry[key],
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

    this.setState({
      entry: {
        ...this.state.entry,
        [key]: value,
      },
    });
  }

  dateInput: HTMLInputElement | null;
  tickInterval: IntervalID;

  tickTimer() {
    if (this.state.tracking) {
      const entry = {
        ...this.state.entry,
        end: new Date(),
      };

      // update state of component
      this.setState({ entry });

      // save temporary state to localStorage
      saveTemporaryItem({ ...entry, tracking: this.state.tracking });
    }
  }

  startTimeTracking() {
    const startTime = new Date();

    this.setState({
      tracking: true,
      entry: {
        ...this.state.entry,
        start: isEqual(this.state.entry.start, defaultStart) ? startTime : this.state.entry.start,
        end: startTime,
      },
    });
  }

  stopTimeTracking() {
    this.setState({
      tracking: false,
    });

    // stop tracking in localStorage
    saveTemporaryItem({ ...this.state.entry, tracking: false });
  }

  addNewProject(project: string) {
    const { onAddNewProject } = this.props;

    const newProject = project.trim();

    if (newProject === '') {
      return;
    }

    if (onAddNewProject) {
      this.setState({
        entry: {
          ...this.state.entry,
          project: onAddNewProject(project),
        },
      });
    }
  }

  addEntry() {
    const { onAdd } = this.props;

    if (typeof onAdd === 'function') {
      onAdd({
        ...this.state.entry,
      });

      // put focus back on date input
      if (this.dateInput) {
        this.dateInput.focus();
      }

      // reset item
      this.setState({
        tracking: false,
        entry: defaultState(),
      });

      // clear item from localStorage
      clearTemporaryItem();
    }
  }

  updateEntry(newState: any) {
    const { entry, onUpdate } = this.props;

    if (typeof onUpdate === 'function' && entry && entry.id) {
      onUpdate({
        id: entry.id,
        ...this.state.entry,
        ...newState,
      });
    }
  }

  keyPress(e: KeyboardEvent) {
    // check if return is pressed
    if (e.charCode && e.charCode === 13 && !this.props.entry) {
      this.addEntry();
    }
  }

  removeEntry() {
    const { entry, onRemove } = this.props;

    if (
      entry && entry.id &&
      typeof onRemove === 'function'
    ) {
      onRemove(entry.id);
    }
  }

  render() {
    const { entry } = this.props;
    const { tracking, confirm } = this.state;
    const {
      start,
      end,
      project,
      notes,
    } = this.state.entry;

    const hasId = Boolean(entry && !!entry.id);

    return (
      <Table.Row className={classnames({ 'TableRow--tracking': tracking })}>
        <Table.Cell width={1}>
          <DateInput
            setRef={this.onSetDateInputRef}
            onKeyPress={this.onKeyPress}
            onChange={this.onDateChange}
            value={format(start, 'YYYY-MM-DD')}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <TimeInput
            onKeyPress={this.onKeyPress}
            onChange={this.onStartTimeChange}
            value={format(start, 'HH:mm')}
            onBlur={this.onStartTimeBlur}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <TimeInput
            onKeyPress={this.onKeyPress}
            onChange={this.onEndTimeChange}
            value={format(end, 'HH:mm')}
            onBlur={this.onEndTimeBlur}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          {timeElapsed(start, end)}
        </Table.Cell>
        <Table.Cell width={3}>
          <ProjectInput
            value={project}
            onAddItem={this.onAddNewProject}
            handleChange={this.onProjectChange}
          />
        </Table.Cell>
        <Table.Cell>
          <NotesInput onKeyPress={this.onKeyPress} onChange={this.onNotesChange} value={notes} />
        </Table.Cell>
        <Table.Cell textAlign="right" style={{ width: 1, whiteSpace: 'nowrap' }}>
          <Button.Group size="small">
            {!hasId && (
              <Fragment>
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
                    <Button icon onClick={this.onAddEntry}>
                      <Icon name="add" />
                    </Button>
                  )}
                  content="Add this entry"
                />
              </Fragment>
            )}
            {hasId && (
              <Fragment>
                <Popup
                  inverted
                  trigger={(
                    <Button icon onClick={this.onOpenConfirm}>
                      <Icon name="remove" />
                    </Button>
                  )}
                  content="Remove this entry"
                />

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
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Entry;
