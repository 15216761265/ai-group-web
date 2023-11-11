export type TResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};
