import { Timestamp } from 'firebase/firestore';

export type TodoType = {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Timestamp;
};
