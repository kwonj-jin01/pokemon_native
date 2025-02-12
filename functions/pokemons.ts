export function getPokemonId(url: string | undefined): number {
  if (!url) return 0;
  return parseInt(url.split("/").at(-2) ?? "0", 10);
}

export function getPokemonArtwork(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatWeight(weight?: number): string {
  if (!weight) {
    return "";
  }

  return (weight / 10).toString().replace(".", ",") + " kg";
}

export function formatSize(size?: number): string {
  if (!size) {
    return "--";
  }

  return (size / 10).toString().replace(".", ",") + " m";
}

export const basePokemonStats = [
  {
    base_stat: 1,
    stat: {
      name: "hp",
      url: "https://pokeapi.co/api/v2/stat/1/",
    },
  },
  {
    base_stat: 1,
    stat: {
      name: "attack",
      url: "https://pokeapi.co/api/v2/stat/2/",
    },
  },
  {
    base_stat: 1,
    stat: {
      name: "defense",
      url: "https://pokeapi.co/api/v2/stat/3/",
    },
  },
  {
    base_stat: 1,
    stat: {
      name: "special-attack",
    },
  },
  {
    base_stat: 1,
    stat: {
      name: "special-defense",
    },
  },
  {
    base_stat: 1,
    stat: {
      name: "speed",
    },
  },
];
