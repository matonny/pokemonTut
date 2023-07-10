import { NavigationContainer } from "@react-navigation/native";
import { PokeTab } from "./PokeTab";
import { Dispatch, createContext, useEffect, useState } from "react";
import { getFavouritePoke } from "./src/cache";

export type FavPokeContextType = {
  favPoke: null | number;
  setFavPoke: Dispatch<React.SetStateAction<number | null>>;
};
export const FavPokeContext = createContext<null | FavPokeContextType>(null);

export default function App() {
  const [favPoke, setFavPoke] = useState<null | number>(null);

  useEffect(() => {
    const initialiseFavPoke = async () => {
      const storedFavPoke = await getFavouritePoke();
      setFavPoke(Number(storedFavPoke));
    };
    initialiseFavPoke();
    return () => {
      setFavPoke(0);
    };
  }, []);

  return (
    <FavPokeContext.Provider value={{ favPoke, setFavPoke }}>
      <NavigationContainer>
        <PokeTab />
      </NavigationContainer>
    </FavPokeContext.Provider>
  );
}
