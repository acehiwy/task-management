import { IsNumber } from 'class-validator';

export type Rollbackable<T, R = Promise<void>> = T extends Promise<infer G>
  ? Promise<{
      result: G;
      rollback: () => R;
    }>
  : {
      result: T;
      rollback: () => R;
    };

export class EnvironmentVariables {
  @IsNumber()
  TASK_UNDO_OPERATION_MAX_CAPACITY: number = 5;
}
