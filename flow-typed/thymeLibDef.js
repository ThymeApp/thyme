declare type projectType = {
  id: string,
  parent: string | null,
  name: string,
  createdAt: string,
  updatedAt: string,
};

declare type projectTreeType = projectType & { nameTree: Array<string> };

declare type timePropertyType = {
  project: string | null,
  date: string,
  start: string,
  end: string,
  notes: string,
}

declare type timeType = {
  id: string,
  createdAt: string,
  updatedAt: string,
} & timePropertyType;

declare type dateRanges = 'today' | 'week' | 'month' | 'older';

declare type RouterLocation = {
  pathname: string,
  search: string,
  hash: string,
  state?: any,
  key?: string
};
