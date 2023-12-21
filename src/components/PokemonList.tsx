import { useContext } from "react";
import styled from "styled-components";
import HistoryContext from "../context/history";
import { useAppSelector } from "../hooks";

//Components
import PokemonItem from "./PokemonItem";

//Types
interface PokemonListProps {
  history?: boolean;
}

//STYLES
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

  return (
    <StyledPokemonList>
      {pokemonData && (
        <div>
          <PokemonItem item={pokemonData} />
        </div>
      )}
      {contextHistory.length > 0 && (
        <div>
          <h2>History</h2>
          {contextHistory.map((item, keys) => {
            return <PokemonItem key={`${item.name}_${keys}`} item={item} />;
          })}
        </div>
      )}
    </StyledPokemonList>
  );
};

export default PokemonList;
