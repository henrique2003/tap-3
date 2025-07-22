import { UserRankDto } from '@/src/domain/dtos';
import { User } from '@/src/domain/entities';
import React, { createContext, useState } from 'react';
import { UserContextType } from './types';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRankDto>({
    id: '',
    username: '',
    games: {
      loses: 0,
      wins: 0,
      total: 0
    },
    points: {
      rank: {
        color: '',
        deductionPoints: 0,
        endValue: 0,
        startValue: 0,
        id: '',
        name: '',
        receivePoints: 0,
      },
      value: 0,
      previousValue: 0,
      previousRank: {
        color: '',
        deductionPoints: 0,
        endValue: 0,
        startValue: 0,
        id: '',
        name: '',
        receivePoints: 0,
      },
    },
  });

  function loadUser(user: User): void {    
    setUser(prevState => {
      const nextUser = {
        ...prevState,
        ...user,
        points: {
          ...user.points,
          previousValue: prevState.points.previousValue,
          previousRank: prevState.points.previousRank
        },
      };

      const isEqual = JSON.stringify(prevState) === JSON.stringify(nextUser);
      if (isEqual) {
        return prevState;
      }

      return nextUser;
    });
  }


  function defineUser(user: UserRankDto): void {
    setUser(prevState => ({
      ...prevState,
      ...user
    }))
  }

  return (
    <UserContext.Provider value={{ defineUser, loadUser, user }}>
      {children}
    </UserContext.Provider>
  );
}
