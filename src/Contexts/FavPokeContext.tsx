import { createContext } from "react";
import { FavPokeContextType } from "../types";

export const FavPokeContext = createContext<undefined | FavPokeContextType>(
  undefined
);
