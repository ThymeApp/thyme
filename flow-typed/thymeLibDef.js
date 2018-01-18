declare type projectType = {
  id: string,
  parent: string | null,
  name: string,
  createdAt: string,
  updatedAt: string,
};

declare type projectTreeType = projectType & { nameTree: Array<string> };

declare type RouterLocation = {
  pathname: string,
  search: string,
  hash: string,
  state?: any,
  key?: string
};
