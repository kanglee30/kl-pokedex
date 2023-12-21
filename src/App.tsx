import React from "react";
import styled from "styled-components";

// Components
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

// Styles
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

function App() {
  return (
    <StyledApp className="App">
      <h1>PokeDex</h1>
      <SearchBar />
      <PokemonList />
    </StyledApp>
  );
}

export default App;
