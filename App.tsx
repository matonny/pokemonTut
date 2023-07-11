import { NavigationContainer } from "@react-navigation/native";
import { PokeTabs } from "./PokeTabs";
import { useEffect, useState } from "react";
import { getFavouritePoke } from "./src/cache";
import { FavPokeContext } from "./src/Contexts/FavPokeContext";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./.firebaseConfig";

export default function App() {
  const [favPoke, setFavPoke] = useState<undefined | number>(undefined);

  useEffect(() => {
    const firebaseConfig = getFirebaseConfig();
    initializeApp(firebaseConfig);

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
