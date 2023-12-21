import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPokemon } from "../thunks/fetchPokemon";

export interface PokemonTypesProps {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonMovesProps {
  name: string;
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
  }[];
}

export interface PokemonAbilitiesProps {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonItemProps {
  id: number;
  name: string;
  abilities: PokemonAbilitiesProps[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  moves: PokemonMovesProps[];
  species: {
    name: string;
  };
  type: string[];
}

export interface PokemonState {
  isLoading: boolean;
  data: PokemonItemProps[] | [];
  history: PokemonItemProps[] | [];
  error: any;
}

const initialState: PokemonState = {
  isLoading: false,
  data: [],
  history: [],
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPokemon.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const poke = action.payload;

        // Filter moves that are learned by level up, sort by level learned
        const filterLearnedMoves = poke.moves
          .filter((move: PokemonMovesProps) => {
            return (
              move.version_group_details[0].move_learn_method.name ===
              "level-up"
            );
          })
          .sort((a: PokemonMovesProps, b: PokemonMovesProps) => {
            return (
              a.version_group_details[0].level_learned_at -
              b.version_group_details[0].level_learned_at
            );
          });

        // Format types
        const formattedTypes: string[] = [];
        poke.types.forEach((typeItem: PokemonTypesProps) => {
          return formattedTypes.push(typeItem.type.name);
        });

        const formattedPokemon = {
          id: poke.id,
          name: poke.name,
          sprites: poke.sprites,
          abilities: poke.abilities,
          moves: filterLearnedMoves,
          species: poke.species,
          type: formattedTypes,
        };

        state.data = [formattedPokemon];
        state.history = [...state.history, formattedPokemon];
      }
    );
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {},
});

export const pokemonReducer = pokemonSlice.reducer;
