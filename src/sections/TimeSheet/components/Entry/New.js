// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import isEqualObject from 'lodash/isEqual';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';

import { clearTemporaryItem, loadTemporaryItem, saveTemporaryItem } from 'core/localStorage';
import {
  changeTimer,
  offStartTimer,
  offStopTimer,
  onStartTimer,
  onStopTimer,
} from 'core/extensions/events';

import { addTime } from '../../actions';

import Entry from './Entry';

type NewEntryProps = {
  now: Date;
  entry?: TempTimePropertyType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onEntryCreate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

type NewEntryState = {
  entry: TimePropertyType;
  tracking: boolean;
};

function defaultState(props = {}, now: Date): TimePropertyType {
  const defaultStart = startOfDay(now);

  return {
    start: props.start || defaultStart,
    end: props.end || defaultStart,
    project: props.project || null,
    notes: props.notes || '',
  };
}

class New extends Component<NewEntryProps, NewEntryState> {
  constructor(props: NewEntryProps) {
    super(props);

    const tempEntry = props.entry || loadTemporaryItem();

    this.state = {
      entry: defaultState(tempEntry, props.now),
      tracking: Boolean(tempEntry && tempEntry.tracking),
    };
  }

  componentDidMount() {
    const { entry, tracking } = this.state;

    this.tickInterval = setInterval(this.tickTimer.bind(this), 1000);

    onStartTimer(this.onStartTimeTracking);
    onStopTimer(this.onStopTimeTracking);

    changeTimer({ tracking, ...entry });
  }

  componentDidUpdate(prevProps: NewEntryProps) {
    const { entry } = this.props;

    if (entry && !isEqualObject(prevProps.entry, entry)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tracking: !!entry.tracking,
        entry: {
          ...entry,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);

    offStartTimer(this.onStartTimeTracking);
    offStopTimer(this.onStopTimeTracking);
  }

  onUpdateItem = (entry: TimePropertyType, tracking: boolean) => {
    const timer = { ...entry, tracking };

    // update local state
    this.setState({ entry });

    // communicate to extensions
    changeTimer(timer);

    // save temporary state to localStorage
    saveTemporaryItem(timer);
  };

  onResetItem = () => {
    const { now } = this.props;

    const entry = defaultState({}, now);

    this.setState({
      tracking: false,
      entry,
    });

    // communicate change of timer
    changeTimer({ tracking: false, ...entry });

    // clear item from localStorage
    clearTemporaryItem();
  };

  onStartTimeTracking = () => {
    const { now } = this.props;
    const { entry } = this.state;

    const startTime = new Date();

    const isOldTempItem = isBefore(entry.start, addDays(now, -1));
    const isNewTempItem = isEqual(entry.start, startOfDay(now));

    const newEntry = {
      ...entry,
      start: isOldTempItem || isNewTempItem ? startTime : entry.start,
      end: startTime,
    };

    this.onUpdateItem(newEntry, true);

    this.setState({
      tracking: true,
      entry: newEntry,
    });
  };

  onStopTimeTracking = () => {
    const { entry } = this.state;

    this.onUpdateItem(entry, false);

    this.setState({
      tracking: false,
    });
  };

  tickTimer() {
    const { tracking, entry: stateEntry } = this.state;

    if (tracking) {
      const entry = {
        ...stateEntry,
        end: new Date(),
      };

      this.onUpdateItem(entry, tracking);

      // update state of component
      this.setState({ entry });
    }
  }

  tickInterval: IntervalID;

  render() {
    const {
      now,
      enabledNotes,
      enabledProjects,
      enabledEndDate,
      onEntryCreate,
      onAddNewProject,
    } = this.props;
    const { entry, tracking } = this.state;

    return (
      <Entry
        round="none"
        now={now}
        entry={entry}
        tracking={tracking}
        isNew
        enabledNotes={enabledNotes}
        enabledProjects={enabledProjects}
        enabledEndDate={enabledEndDate}
        onAdd={onEntryCreate}
        onUpdate={this.onUpdateItem}
        onStart={this.onStartTimeTracking}
        onStop={this.onStopTimeTracking}
        onAddNewProject={onAddNewProject}
        onResetItem={this.onResetItem}
      />
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onEntryCreate(entry: TimePropertyType) {
      dispatch(addTime({
        ...entry,
        id: shortid.generate(),
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(New);
