import { Result } from "@/src/domain";
import { UserRankDto } from "@/src/domain/dtos";
import { User } from "@/src/domain/entities";
import { AxiosService } from "./axios-service";

export class UserService {
  private readonly route: string = '/user';
  private readonly axiosService: AxiosService = new AxiosService(`${this.route}`);

  async create(username: string): Promise<Result<User>> {
    const result = await this.axiosService.post<User>('/create', { username })
    if (result.isFailure()) {
      return result;
    }

    return Result.success(result.getValue());
  }

  async getById(id: string): Promise<Result<User>> {
    const result = await this.axiosService.get<User>(`/${id}`)
    if (result.isFailure()) {
      return result;
    }

    return Result.success(result.getValue());
  }

  async registerVictory(id: string, win: boolean): Promise<Result<UserRankDto>> {
    const result = await this.axiosService.put<UserRankDto>(`/${id}`, {
      game: {
        win,
        lose: !win
      }
    })
    if (result.isFailure()) {
      return result;
    }    

    return Result.success(result.getValue());
  }
}