import React from "react";
import styled from "styled-components";

import PokemonList from "./components/PokemonList";
import Route from "./components/Route";
import SearchBar from "./components/SearchBar";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

function App() {
  return (
    <StyledApp className="App">
      <Route path="/">
        <h1>PokeDex</h1>
        <SearchBar />
        <PokemonList />
        <PokemonList history={true} />
      </Route>
    </StyledApp>
  );
}

export default App;
