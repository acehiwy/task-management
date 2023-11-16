export type Rollbackable<T, R = Promise<void>> = T extends Promise<infer G>
  ? Promise<{
      result: G;
      rollback: () => R;
    }>
  : {
      result: T;
      rollback: () => R;
    };

