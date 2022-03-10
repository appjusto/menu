export interface Ordering {
  parents: string[];
  childrenByParentId: {
    [parentId: string]: string[];
  };
}
