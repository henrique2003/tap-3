import { useContext } from "react";
import { UserContext } from "./user-context";

export function useUserCtx() {
  const context = useContext(UserContext);

  if (!context)  {
    throw new Error('useUser must be used within TabBarProvider');
  }

  return context;
}