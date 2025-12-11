import { TaskPriority } from '@prisma/client';
import _ from 'lodash';

export const PRIORITY_OPTIONS = Object.values(TaskPriority).map((priority) => ({
  value: priority,
  label: _.capitalize(priority),
}));
