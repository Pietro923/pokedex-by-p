'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get<{results: Pokemon[]}>('https://pokeapi.co/api/v2/pokemon?limit=40')
        setPokemon(response.data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokémon', error)
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <main>
      <h1>Pokédex</h1>
      {pokemon.map((p, index) => (
        <div key={index}>{p.name}</div>
      ))}
    </main>
  )
}