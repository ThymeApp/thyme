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

import { saveTemporaryItem, clearTemporaryItem } from '../../core/localStorage';
import { timeElapsed, roundEndTime, roundStartTime } from '../../core/thyme';
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
  settings: {
    rounding: any,
    roundingDown: any,
  },
  onAdd?: (entry: timePropertyType) => void,
  onRemove?: (id: string) => void,
  onUpdate?: (entry: timePropertyType) => void,
  onAddNewProject?: (project: string) => string,
};

type EntryStateType = {
  entry: timePropertyType,
  tracking: boolean,
  confirm: boolean,
};

class Entry extends Component<EntryType, EntryStateType> {
  constructor(props: EntryType) {
    super(props);
    this.rounding = this.props.settings.rounding;
    this.roundingDown = this.props.settings.roundingDown;
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

  onDateChange = (e: Event) => this.onStartDateChange(valueFromEventTarget(e.target));

  onStartTimeChange = (e: Event) => this.onTimeChange('start', valueFromEventTarget(e.target));

  onEndTimeChange = (e: Event) => this.onTimeChange('end', valueFromEventTarget(e.target));

  onProjectChange = (e: Event, project: { value: string, label: string }) => this.onValueChange(
    'project',
    project === null ? null : project.value,
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
    const { entry } = this.state;
    let startTime = isEqual(entry.start, defaultStart) ?
      new Date() : entry.start;
    const minutes = parseInt(format(startTime, 'mm'), 10);
    const hours = parseInt(format(startTime, 'HH'), 10);
    const rounding = parseInt(this.rounding, 10);
    const roundingDown = parseInt(this.roundingDown, 10);
    const timeString = roundStartTime(minutes, hours, rounding, roundingDown);
    const [roundedHours, roundedMinutes] = timeString.split(':');
    startTime = setHours(
      setMinutes(startTime, parseInt(roundedMinutes, 10)),
      parseInt(roundedHours, 10),
    );
    this.setState({
      tracking: true,
      entry: {
        ...entry,
        start: startTime,
        end: startTime,
      },
    });
  }

  onStopTimeTracking = () => {
    const { entry } = this.state;
    const { end } = entry;
    const endMinutes = parseInt(format(end, 'mm'), 10);
    const endHours = parseInt(format(end, 'HH'), 10);
    const roundingInt = parseInt(this.rounding, 10);
    const roundingDownInt = parseInt(this.roundingDown, 10);
    const timeString = roundEndTime(endMinutes, endHours, roundingInt, roundingDownInt);
    this.onTimeChange('end', timeString);
    this.setState({
      tracking: false,
    });

    // stop tracking in localStorage
    saveTemporaryItem({ ...entry, tracking: false });
  };

  onAddEntry = () => {
    const { onAdd } = this.props;
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
        entry: defaultState(),
      });

      // clear item from localStorage
      clearTemporaryItem();
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    const { entry } = this.props;
    // check if return is pressed
    if (e.charCode && e.charCode === 13 && !entry) {
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
    const { entry } = this.props;
    const { tracking, confirm, entry: stateEntry } = this.state;
    const {
      start,
      end,
      project,
      notes,
    } = stateEntry;

    const hasId = Boolean(entry && !!entry.id);
    const [hours, minutes, seconds] = (timeElapsed(start, end, tracking, true) || '00:00:00')
      .split(':');

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
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <TimeInput
            onKeyPress={this.onKeyPress}
            onChange={this.onEndTimeChange}
            value={format(end, 'HH:mm')}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          {hours}
          :
          {minutes}
          {tracking && (
            <Fragment>
              :
              {seconds}
            </Fragment>
          )}
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
