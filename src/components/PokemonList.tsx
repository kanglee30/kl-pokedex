import { useContext, useEffect } from "react";
import styled from "styled-components";
import HistoryContext from "../context/history";
import { useAppSelector } from "../hooks";

//Components
import PokemonItem from "./PokemonItem";

interface PokemonListProps {
  history?: boolean;
}

const StyledPokemonList = styled.div`
  margin-top: 20px;
  h2 {
    text-align: center;
  }
`;

const PokemonList: React.FC<PokemonListProps> = ({ history = false }) => {
  const { history: contextHistory } = useContext(HistoryContext);

  const pokemonData = useAppSelector((state) => {
    return state.pokemon.data[0];
  });

  const pokemonHistory = contextHistory;
  let renderedBase = null;

  if (history && pokemonHistory.length > 0) {
    renderedBase = (
      <div>
        <h2>History</h2>
        {pokemonHistory.map((item, keys) => {
          return <PokemonItem key={`${item.name}_$${keys}`} item={item} />;
        })}
      </div>
    );
  } else {
    renderedBase = (
      <div>{pokemonData && <PokemonItem item={pokemonData} />}</div>
    );
  }

  return <StyledPokemonList>{renderedBase}</StyledPokemonList>;
};

export default PokemonList;
