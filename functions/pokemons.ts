export function getPokemonId(url: string | undefined): number {
  if (!url) return 0;
  return parseInt(url.split('/').at(-2) ?? '0', 10);
}