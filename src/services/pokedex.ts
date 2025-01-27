import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
}

export const fetchPokemon = async (limit: number = 151): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<{ results: Pokemon[] }>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    const detailedPokemon = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get<{ sprites: { front_default: string } }>(pokemon.url);
        return {
          ...pokemon,
          sprites: details.data.sprites,
        };
      })
    );

    return detailedPokemon;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw new Error('Failed to fetch Pokémon data');
  }
};