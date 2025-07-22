import { UserRankDto } from "@/src/domain/dtos";
import { User } from "@/src/domain/entities";

export type UserContextType = {
  user: UserRankDto;
  defineUser: (user: UserRankDto) => void;
  loadUser: (user: User) => void;
};