import { Result } from "@/src/domain";
import { api } from "@/src/lib/api/api";

type AxiosServiceError = {
  error: string;
}

export class AxiosService {
  constructor(
    public readonly baseUrl: string,
  ) {}

  async get<T>(url: string, params?: Record<string, string | number | boolean | undefined | null>): Promise<Result<T>> {
    try {
      const { data, status } = await api.get<T | AxiosServiceError>(`${this.baseUrl}${url}`, { params });
      if (status === 200 || status === 201 || status === 204) {
        return Result.success(data as T);
      }

      const { error } = data as AxiosServiceError;

      return Result.failure(error);
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Axios error';
      
      return Result.failure(message as string);
    }
  }

  async post<T>(url: string, body?: Record<string, 
    string | number | boolean | undefined | null | object
  >): Promise<Result<T>> {
    try {
      const { data, status } = await api.post<T | AxiosServiceError>(`${this.baseUrl}${url}`, body);

      if (status === 200 || status === 201 || status === 204) {
        return Result.success(data as T);
      }

      const { error } = data as AxiosServiceError;

      return Result.failure(error);
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Axios error';
      
      return Result.failure(message as string);
    }
  }

  async put<T>(url: string, body?: Record<string, 
    string | number | boolean | undefined | null | object
  >): Promise<Result<T>> {
    try {
      const { data, status } = await api.put<T | AxiosServiceError>(`${this.baseUrl}${url}`, body);

      if (status === 200 || status === 201 || status === 204) {
        return Result.success(data as T);
      }

      const { error } = data as AxiosServiceError;

      return Result.failure(error);
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Axios error';
      
      return Result.failure(message as string);
    }
  }
}