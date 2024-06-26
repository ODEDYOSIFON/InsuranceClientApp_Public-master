export interface ResponseDto<T> {
    data: T;
    isSuccess: boolean;
    message: string;
  }