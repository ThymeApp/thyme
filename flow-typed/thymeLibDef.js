declare type projectType = {
  id: string,
  parent: string | null,
  name: string,
  createdAt: string,
  updatedAt: string,
};

declare type projectTreeType = projectType & { nameTree: Array<string> };
