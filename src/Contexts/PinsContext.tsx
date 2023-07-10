import { createContext } from "react";
import { MapPinsContextType } from "../types";

export const PinsContext = createContext<undefined | MapPinsContextType>(
  undefined
);
