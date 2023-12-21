export const formatName = (name: string) => {
  return name.replaceAll("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export enum PokemonType {
  NORMAL = "normal",
  FIGHTING = "fighting",
  FLYING = "flying",
  POISON = "poison",
  GROUND = "ground",
  ROCK = "rock",
  BUG = "bug",
  GHOST = "ghost",
  STEEL = "steel",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
  ELECTRIC = "electric",
  PSYCHIC = "psychic",
  ICE = "ice",
  DRAGON = "dragon",
  DARK = "dark",
  FAIRY = "fairy",
  UNKOWN = "unknown",
  SHADOW = "shadow",
}
