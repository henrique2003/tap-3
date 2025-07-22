import { Result } from "@/src/domain";
import { AxiosService } from "./axios-service";

export class TierListService {
  private readonly route: string = '/tier-list';
  private readonly axiosService: AxiosService = new AxiosService(`${this.route}`);

  async getAll(): Promise<Result<any>> {
    const result = await this.axiosService.get('')
    if (result.isFailure()) {
      return result;
    }

    return Result.success(result.getValue());
  }
}