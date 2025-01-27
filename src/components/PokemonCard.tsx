import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PokemonCardProps {
  pokemon: {
    name: string;
    sprites?: {
      front_default: string;
    };
    url: string; // Agregamos la URL para obtener más detalles
  };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
    fetchPokemonDetails();
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        {pokemon.sprites?.front_default && (
          <div className="flex justify-center bg-gray-100 rounded-lg p-4 mb-4">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={150}
              height={150}
              className="hover:animate-pulse"
            />
          </div>
        )}
        <h2 className="text-center text-2xl font-semibold capitalize text-gray-800">
          {pokemon.name}
        </h2>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{pokemon.name}</DialogTitle>
          </DialogHeader>
          {pokemonDetails && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={pokemonDetails.sprites.front_default}
                  alt={pokemonDetails.name}
                  width={150}
                  height={150}
                />
              </div>
              <div>
                <h3 className="font-semibold">Altura:</h3>
                <p>{pokemonDetails.height / 10} m</p>
              </div>
              <div>
                <h3 className="font-semibold">Peso:</h3>
                <p>{pokemonDetails.weight / 10} kg</p>
              </div>
              <div>
                <h3 className="font-semibold">Tipos:</h3>
                <ul className="list-disc list-inside">
                  {pokemonDetails.types.map((type: any, index: number) => (
                    <li key={index} className="capitalize">
                      {type.type.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Habilidades:</h3>
                <ul className="list-disc list-inside">
                  {pokemonDetails.abilities.map((ability: any, index: number) => (
                    <li key={index} className="capitalize">
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}