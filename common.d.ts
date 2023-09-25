import { Timestamp } from 'firebase/firestore';

export type TodoType = {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Timestamp;
};

export interface IconProps {
  w: string;
  h: string;
}
