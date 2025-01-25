'use client'
import { useState, useEffect } from 'react'
import { fetchPokemon } from '../services/pokedex'

interface Pokemon {
  name: string
  url: string
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemon()
      setPokemon(data)
      setLoading(false)
    }
    loadPokemon()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <main>
      <h1>Pokédex de Pietro</h1>
      {pokemon.map((p, index) => (
        <div key={index}>{p.name}</div>
      ))}
    </main>
  )
}