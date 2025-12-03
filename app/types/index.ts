export interface IUser {
  id: string;
  email: string;
  fullName: string;
}

export interface IBaseResponse {
  success: boolean;
  message: string;
}

export interface ISummary {
  total: number;
  completed: number;
  incomplete: number;
  overdue: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
  OVERDUE = 'OVERDUE',
}
