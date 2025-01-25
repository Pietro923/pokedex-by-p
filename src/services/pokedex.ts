// services/pokedex.ts
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

export const fetchPokemon = async (limit: number = 40): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<{results: Pokemon[]}>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching Pokémon', error)
    return []
  }
}