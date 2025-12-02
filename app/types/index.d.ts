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
