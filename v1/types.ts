export interface Ordering {
  firstLevelIds: string[];
  secondLevelIdsByFirstLevelId: {
    [firstLevelId: string]: string[];
  };
}

export interface Ordering2 {
  parents: string[];
  childrenByParentId: {
    [parentId: string]: string[];
  };
}
