// @flow

import type { Store, Dispatch } from 'redux';
import type { Node } from 'react';

declare type TimeShape = {
  byId: {
    [key: string]: TimeType;
  };
  allIds: string[];
  dateRange: DateRanges;
  dateSort: SortDirection;
  page: number;
};

declare type ProjectsShape = {
  byId: {
    [key: string]: ProjectType;
  };
  allIds: string[];
};

declare type ReportsShape = {
  byId: {
    [key: string]: ReportType;
  };
  allIds: string[];
  filters: Array<string | null>;
  from: Date | string;
  to: Date | string;
};

declare type SettingsRounding = {
  durationRounding: Rounding;
  durationRoundingAmount: number;
  roundingOn: RoundableOn;
};

declare type SettingsTimesheet = {
  perPage: number;
  enableNotes: boolean;
  enableProjects: boolean;
  enableEndDate: boolean;
};

declare type SettingsAdvanced = {
  apiRoot: string;
};

declare type SettingsShape = {
  rounding: SettingsRounding;
  timesheet: SettingsTimesheet;
  advanced: SettingsAdvanced;
};

declare type Capability = 'premium' | 'project_rates' | 'insights';

declare type StateShape = {
  account: {
    jwt: string | null;
    capabilities: Capability[];
  };
  app: {
    alert: string;
    syncing: boolean;
    update: boolean;
    plugins: string[];
  };
  time: TimeShape;
  projects: ProjectsShape;
  reports: ReportsShape;
  settings: SettingsShape;
};

declare type ReportType = {
  id: string;
  name: string;
  from: string;
  to: string;
  filters: Array<string | null>;
  removed?: boolean;
  createdAt: string;
};

declare type ProjectProps = {
  id: string;
  parent: string | null;
  name: string;
};

declare type ProjectType = {
  removed?: boolean;
  createdAt: string;
  updatedAt: string;
} & ProjectProps;

declare type ProjectTreeType = ProjectType & { nameTree: Array<string> };
declare type ProjectTreeWithTimeType = ProjectTreeType & { time: number, entries: Array<TimeType> };

declare type TimePropertyType = {
  project: string | null;
  start: Date;
  end: Date;
  notes: string;
}

declare type TempTimePropertyType = {
  tracking: boolean;
} & TimePropertyType;

declare type TimeType = {
  id: string;
  removed?: boolean;
  createdAt: string;
  updatedAt: string;
} & TimePropertyType;

declare type DateRanges = 'today' | 'week' | 'weekToDate' | 'month' | 'older';
declare type SortDirection = 'desc' | 'asc';

declare type Rounding = 'none' | 'round' | 'ceil' | 'floor';
declare type RoundableOn = 'entries' | 'reports';

declare type ActionsObservable = {
  pipe: any;
};

declare type StateObservable = {
  value: StateShape;
};

declare type AccountInformation = {
  capabilities: Capability[];
};

declare type SettingsPanel = {
  name: string;
  url: string;
  content: Node;
};

declare type ThymeStore = Store<StateShape, *>;
declare type ThymeDispatch = Dispatch<*>;
