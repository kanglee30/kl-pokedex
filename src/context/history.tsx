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
  const pokemonHistory: PokemonItemProps[] = useAppSelector((state) => {
    return state.pokemon.history;
  });

  useEffect(() => {
    const history = localStorage.getItem("history");
    if (history) {
      const parsedHistory: PokemonItemProps[] = JSON.parse(history);
      const mergedHistory: PokemonItemProps[] = [];
      const historyLength = Math.max(
        parsedHistory.length,
        pokemonHistory.length
      );

      for (let i = 0; i < historyLength; i++) {
        mergedHistory.push({
          ...parsedHistory[i],
          ...pokemonHistory[i],
        });
      }

      localStorage.setItem("history", JSON.stringify(mergedHistory));
      setHistory(mergedHistory);
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
