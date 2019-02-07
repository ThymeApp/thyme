// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';

import { clearTemporaryItem, loadTemporaryItem, saveTemporaryItem } from 'core/localStorage';
import {
  changeTimer,
  onStartTimer,
  offStartTimer,
  onStopTimer,
  offStopTimer,
  onAddEntry,
  offAddEntry,
  onReceiveTimer,
  offReceiveTimer,
} from 'core/extensions/events';

import { isLoggedIn } from 'sections/Account/selectors';

import { addTime } from '../../actions';

import { getTemporaryItem } from '../../api';

import Entry from './Entry';

type NewEntryProps = {
  now: Date;
  loggedIn: boolean;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onEntryCreate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

type NewEntryState = {
  fetching: boolean;
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

    this.state = {
      fetching: true,
      entry: defaultState({}, props.now),
      tracking: false,
    };
  }

  componentDidMount() {
    this.tickInterval = setInterval(this.tickTimer.bind(this), 1000);

    // register listeners
    onStartTimer(this.onStartTimeTracking);
    onStopTimer(this.onStopTimeTracking);
    onReceiveTimer(this.onReceiveTimer);
    onAddEntry(this.onAddItem);

    this.resolveTemporaryItem();
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);

    // unregister listeners
    offStartTimer(this.onStartTimeTracking);
    offStopTimer(this.onStopTimeTracking);
    offReceiveTimer(this.onReceiveTimer);
    offAddEntry(this.onAddItem);
  }

  onAddItem = (entry: TimePropertyType) => {
    const { onEntryCreate } = this.props;

    onEntryCreate(entry);

    this.onResetItem(false);
  };

  onReceiveTimer = (
    { entry, emitChange }: { entry: TempTimePropertyType, emitChange: boolean },
  ) => {
    const { tracking } = entry;
    const newEntry = {
      start: entry.start,
      end: entry.end,
      project: entry.project,
      notes: entry.notes,
    };

    this.onUpdateItem(newEntry, tracking, emitChange);
  };

  onUpdateItem = (
    entry: TimePropertyType,
    tracking: boolean,
    emitChange: boolean = true,
    saveTemporary: boolean = true,
  ) => {
    const timer = { ...entry, tracking };

    // update local state
    this.setState({ entry, tracking });

    const storedTimer = {
      ...timer,
      updatedAt: +new Date(),
    };

    if (saveTemporary) {
      // save temporary state to localStorage
      saveTemporaryItem(storedTimer);
    }

    if (emitChange) {
      // communicate to extensions
      changeTimer(storedTimer);
    }
  };

  onResetItem = (newItem: boolean) => {
    const { now } = this.props;
    const { entry } = this.state;

    const newEntry = defaultState(newItem ? { project: entry.project } : {}, now);

    this.setState({
      tracking: false,
      entry: newEntry,
    });

    // communicate change of timer
    changeTimer({ tracking: false, ...entry, updatedAt: +new Date() });

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

  onReceiveTempItem = (entry) => {
    const tempEntry = loadTemporaryItem();

    if (!tempEntry || !tempEntry.updatedAt) {
      this.applyTemporaryItem(entry || {});
      return;
    }

    if (!entry || !entry.updatedAt) {
      this.applyTemporaryItem(tempEntry);
      return;
    }

    this.applyTemporaryItem(isBefore(tempEntry.updatedAt, entry.updatedAt) ? entry : tempEntry);
  };

  resolveTemporaryItem() {
    const { loggedIn } = this.props;

    this.setState({ fetching: true });

    const tempItem = loadTemporaryItem();

    if (loggedIn) {
      getTemporaryItem()
        .then(this.onReceiveTempItem)
        .catch(() => this.applyTemporaryItem(tempItem));
    } else {
      this.applyTemporaryItem(tempItem);
    }
  }

  applyTemporaryItem(entry) {
    const { now } = this.props;

    const tracking = Boolean(entry && entry.tracking);

    this.setState({
      fetching: false,
      entry: defaultState(entry, now),
      tracking,
    });

    changeTimer({ tracking, ...entry });
  }

  tickTimer() {
    const { tracking, entry: stateEntry } = this.state;

    if (tracking) {
      const entry = {
        ...stateEntry,
        end: new Date(),
      };

      this.onUpdateItem(entry, tracking, false, false);

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
    const { entry, tracking, fetching } = this.state;

    return (
      <Entry
        disabled={fetching}
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

function mapStateToProps(state: StateShape) {
  return {
    loggedIn: isLoggedIn(state),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(New);
