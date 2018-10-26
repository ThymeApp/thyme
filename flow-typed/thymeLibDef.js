// @flow

import type { Store } from 'redux';

declare type timeShape = {
  byId: {
    [key: string]: timeType;
  };
  allIds: string[];
  dateRange: dateRanges;
  dateSort: sortDirection;
  page: number;
};

declare type projectsShape = {
  byId: {
    [key: string]: projectType;
  };
  allIds: string[];
};

declare type reportsShape = {
  byId: {
    [key: string]: reportType;
  };
  allIds: string[];
  filters: Array<string | null>;
  from: Date | string;
  to: Date | string;
};

declare type settingsRounding = {
  durationRounding: rounding;
  durationRoundingAmount: number;
  roundingOn: roundableOn;
};

declare type settingsTimesheet = {
  perPage: number;
  enableNotes: boolean;
  enableProjects: boolean;
  enableEndDate: boolean;
};

declare type settingsShape = {
  rounding: settingsRounding;
  timesheet: settingsTimesheet;
};

declare type capability = 'project_rates';

declare type storeShape = {
  account: {
    jwt: string | null;
    capabilities: capability[];
  };
  app: {
    alert: string;
    syncing: boolean;
    update: boolean;
  };
  time: timeShape;
  projects: projectsShape;
  reports: reportsShape;
  settings: settingsShape;
};

declare type reportType = {
  id: string;
  name: string;
  from: string;
  to: string;
  filters: Array<string | null>;
  removed?: boolean;
  createdAt: string;
};

declare type projectType = {
  id: string;
  parent: string | null;
  name: string;
  removed?: boolean;
  createdAt: string;
  updatedAt: string;
};

declare type projectTreeType = projectType & { nameTree: Array<string> };
declare type projectTreeWithTimeType = projectTreeType & { time: number, entries: Array<timeType> };

declare type timePropertyType = {
  project: string | null;
  start: Date;
  end: Date;
  notes: string;
}

declare type tempTimePropertyType = {
  tracking: boolean;
} & timePropertyType;

declare type timeType = {
  id: string;
  removed?: boolean;
  createdAt: string;
  updatedAt: string;
} & timePropertyType;

declare type dateRanges = 'today' | 'week' | 'weekToDate' | 'month' | 'older';
declare type sortDirection = 'desc' | 'asc';

declare type rounding = 'none' | 'round' | 'ceil' | 'floor';
declare type roundableOn = 'entries' | 'reports';

declare type RouterLocation = {
  pathname: string;
  search: string;
  hash: string;
  state?: any;
  key?: string;
};

declare type RouterMatch = {
  isExact: boolean;
  params: any;
  path: string;
  url: string;
};

declare type RouterHistory = {
  push: (path: string) => void;
};

declare type ActionsObservable = {
  pipe: any;
};

declare type StateObservable = {
  value: storeShape;
};

declare type ThymeStore = Store<storeShape, *>;
