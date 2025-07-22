import { Result } from "@/src/domain";
import { TierListItem } from "@/src/domain/dtos";
import { AxiosService } from "./axios-service";

export class TierListService {
  private readonly route: string = '/tier-list';
  private readonly axiosService: AxiosService = new AxiosService(`${this.route}`);

  async getAll(page: number = 1): Promise<Result<TierListItem[]>> {
    const result = await this.axiosService.get<TierListItem[]>('', { page })
    if (result.isFailure()) {
      return result;
    }

    return Result.success(result.getValue());
  }
}