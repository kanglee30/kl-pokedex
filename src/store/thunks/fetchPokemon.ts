import { createAsyncThunk } from "@reduxjs/toolkit";
import { PokemonClient } from "pokenode-ts";

const fetchPokemon = createAsyncThunk(
  "pokemon/fetch",
  async (pokemonName: string) => {
    const api = new PokemonClient();
    const pokemonData = await api.getPokemonByName(pokemonName);
    return pokemonData;
  }
);

export { fetchPokemon };
