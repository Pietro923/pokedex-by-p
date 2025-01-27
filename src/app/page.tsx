'use client';
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemon, Pokemon } from '../services/pokedex';

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemon(151);
        setPokemon(data);
      } catch (error) {
        console.error('Error loading Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700">
        <div className="text-white text-4xl animate-pulse">Cargando Pokédex...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-red-700 p-8">
      <h1 className="text-center text-5xl font-bold text-white mb-12 drop-shadow-lg">
        Pokédex de Pietro
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg shadow-md w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {paginatedPokemon.map((p, index) => (
          <PokemonCard key={index} pokemon={p} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-800'
            } hover:bg-yellow-400 transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}