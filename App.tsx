import { NavigationContainer } from "@react-navigation/native";
import { PokeTabs } from "./PokeTabs";
import { createContext, useEffect, useState } from "react";
import { getFavouritePoke } from "./src/cache";
import { FavPokeContextType } from "./src/types";

export const FavPokeContext = createContext<undefined | FavPokeContextType>(
  undefined
);

export default function App() {
  const [favPoke, setFavPoke] = useState<undefined | number>(undefined);

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
        <PokeTabs />
      </NavigationContainer>
    </FavPokeContext.Provider>
  );
}
