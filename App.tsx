import { NavigationContainer } from "@react-navigation/native";
import { PokeTabs } from "./PokeTabs";
import { useEffect, useState } from "react";
import { getFavouritePoke } from "./src/cache";
import { FavPokeContext } from "./src/Contexts/FavPokeContext";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./.firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserScreen } from "./src/Containers/UserScreen";

export default function App() {
  const [favPoke, setFavPoke] = useState<undefined | number>(undefined);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
    }
  });

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
  if (!userLoggedIn) {
    return <UserScreen />;
  }
  return (
    <FavPokeContext.Provider value={{ favPoke, setFavPoke }}>
      <NavigationContainer>
        <PokeTabs />
      </NavigationContainer>
    </FavPokeContext.Provider>
  );
}
