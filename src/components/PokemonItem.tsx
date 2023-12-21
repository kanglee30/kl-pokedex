import { useState } from "react";
import styled, { keyframes } from "styled-components";
import classNames from "classnames";

import {
  PokemonItemProps,
  PokemonMovesProps,
  PokemonAbilitiesProps,
} from "../store/slices/pokemonSlice";
import { formatName } from "../util";

import PokemonTypeIcon from "./PokemonTypeIcon";

interface ItemProps {
  idx?: number;
  item: PokemonItemProps;
}

const shimmerAnimation = keyframes`
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
`;

const StyledPokemonItem = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: rgb(89, 166, 148);
  box-shadow: 0 10px 15px 1px rgba(0, 0, 0, 100);
  padding: 10px;
  margin-top: 32px;
  h4 {
    margin: 10px 0;
  }
  p {
    font-size: 12px;
    margin: 10px 10px 0 0;
  }
  .pokemon_header {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    background-color: rgb(0, 61, 78);
    border-radius: 10px;
    color: white;
    text-align: center;
    h4 {
      margin-bottom: 0;
    }
    p {
      margin-right: 0;
    }
    &__img {
      button {
        border-radius: 5px;
        border: none;
        padding: 3px 3px;
        &:nth-child(2) {
          color: white;
          margin-left: 5px;
          background: linear-gradient(
            -45deg,
            rgba(255, 0, 0, 0.5) 0%,
            rgba(255, 255, 0, 0.5) 25%,
            rgba(0, 255, 0, 0.5) 50%,
            rgba(0, 0, 255, 0.5) 75%,
            rgba(255, 0, 255, 0.5) 100%
          );
          background-size: 200% 200%;
          animation: ${shimmerAnimation} 6s linear infinite;
        }
        &.active {
          background: rgb(89, 166, 148);
        }
      }
    }
  }
  .pokemon_body {
    width: 75%;
    padding: 10px 10px 10px 32px;
  }
  .pokemon_body__wrapper {
    display: flex;
    flex-direction: column;
  }
  .pokemon__items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    &--single {
      grid-template-columns: 1fr;
    }
    &__type {
      margin-top: 10px;
      p {
        margin: 0 10px 0 0;
      }
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__moves {
      span {
        padding-right: 5px;
      }
    }
  }
  @media (max-width: 800px) {
    .pokemon__items {
      grid-template-columns: 1fr 1fr;
      &--single {
        grid-template-columns: 1fr;
      }
    }
  }
`;

const PokemonItem: React.FC<ItemProps> = ({ item, idx = 0 }) => {
  const [showShiny, setShowShiny] = useState(false);
  const { name, sprites, abilities, moves, species, type, id } = item;
  return (
    <StyledPokemonItem>
      <div className="pokemon_header">
        <h3>{`${name.charAt(0).toUpperCase() + name.slice(1)}`}</h3>
        <div className="pokemon_header__img">
          <button
            className={classNames({
              active: !showShiny,
            })}
            onClick={() => setShowShiny(false)}
          >
            Normal
          </button>
          <button
            className={classNames({
              active: showShiny,
            })}
            onClick={() => setShowShiny(true)}
          >
            Shiny
          </button>
          <img
            src={showShiny ? sprites.front_shiny : sprites.front_default}
            alt={item.name}
          />
        </div>
        <h4>Species</h4>
        <p>{species.name}</p>
        <h4>Types</h4>
        <div className="pokemon__items pokemon__items--single">
          {type.map((type: string) => {
            return (
              <div
                className="pokemon__items__type"
                key={`${type}_${id}_${idx}`}
              >
                <PokemonTypeIcon typedName={type} />
                <p>{type}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pokemon_body">
        <div className="pokemon_body__wrapper">
          <h4>Abilities</h4>
          <div className="pokemon__items">
            {abilities.map((ability: PokemonAbilitiesProps) => {
              return (
                <p key={`${ability.ability.name}_${id}_${idx}`}>
                  {formatName(ability.ability.name)}
                </p>
              );
            })}
          </div>
        </div>
        <div className="pokemon_body__wrapper">
          <h4>Moves</h4>
          <div className="pokemon__items">
            {moves.map((move: PokemonMovesProps) => {
              return (
                <div
                  className="pokemon__items__moves"
                  key={`${move.move.name}_${id}_${idx}`}
                >
                  <p>
                    <span>
                      {`Lv. ${move.version_group_details[0].level_learned_at}`}
                    </span>
                    {formatName(move.move.name)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StyledPokemonItem>
  );
};

export default PokemonItem;
