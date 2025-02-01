export function getPokemonId(url: string | undefined): number {
  if (!url) return 0;
  return parseInt(url.split('/').at(-2) ?? '0', 10);
}

export function getPokemonArtwork(id: number | string ): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}