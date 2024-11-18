// api-response.interface.ts
export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: string;
  data: ApiDataResponse<T>;
}

export interface ApiDataResponse<T> {
  result: T[];
  totalCount: number;
}

interface MsgTranslate {
  es: string;
  en: string;
}
