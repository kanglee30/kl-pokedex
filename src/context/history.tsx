import React, { createContext, useState, useEffect, ReactNode } from "react";
import { PokemonItemProps } from "../store/slices/pokemonSlice";
import { useAppSelector } from "../hooks";

//TYPES
interface HistoryContextProps {
  history: PokemonItemProps[] | [];
}

const HistoryContext = createContext<HistoryContextProps>({
  history: [],
});

interface HistoryProviderProps {
  children: ReactNode;
}

function HistoryProvider({ children }: HistoryProviderProps) {
  const [history, setHistory] = useState<PokemonItemProps[] | []>([]);
  const pokemonHistory = useAppSelector((state) => {
    return state.pokemon.history;
  });

  useEffect(() => {
    const history = localStorage.getItem("history");
    if (history) {
      localStorage.setItem("history", JSON.stringify(pokemonHistory));
      setHistory(pokemonHistory);
    } else {
      localStorage.setItem("history", JSON.stringify(pokemonHistory));
      setHistory(pokemonHistory);
    }
  }, [pokemonHistory]);

  const contextValue = {
    history,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
}

export { HistoryProvider };
export default HistoryContext;
