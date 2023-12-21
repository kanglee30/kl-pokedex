import { useState } from "react";
import styled from "styled-components";

import { fetchPokemon } from "../store";
import { useAppDispatch } from "../hooks";

const StyledSearchBar = styled.div`
  .search_bar__form {
    display: flex;
    flex-direction: column;
    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s;
      &:focus {
        outline: none;
        border-color: rgb(254, 102, 202);
        box-shadow: 0 0 5px rgba(254, 102, 202, 0.5);
      }
    }
  }
  .search_bar {
    &__error,
    &__loading {
      text-align: center;
      margin: 10px 0;
    }
    &__error {
      color: red;
    }
  }
  .search_bar__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 300px;
      margin-bottom: 10px;
    }
    &__button {
      width: 120px;
      margin-top: 10px;
      padding: 10px 10px;
      color: white;
      text-transform: uppercase;
      font-size: 16px;
      text-align: center;
      background: rgb(254, 102, 202);
      border: none;
      border-radius: 22px;
      cursor: pointer;
    }
  }
`;

const SearchBar: React.FC = () => {
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
  const [error, setError] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoadingPokemon(true);
    setError(false);
    dispatch(fetchPokemon(pokemonName))
      .unwrap()
      .catch((err) => {
        setError(true);
      })
      .finally(() => setIsLoadingPokemon(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(
      event.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    );
  };

  return (
    <StyledSearchBar>
      {error && <div className="search_bar__error">No Pokemon Found</div>}
      {isLoadingPokemon && (
        <div className="search_bar__loading">Fetching data...</div>
      )}
      <form className="search_bar__form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          required
          placeholder="Enter Pokemon Name"
          onChange={handleChange}
          className="input"
          value={pokemonName || ""}
        />
        <button className="search_bar__form__button" type="submit">
          Search
        </button>
      </form>
    </StyledSearchBar>
  );
};

export default SearchBar;
