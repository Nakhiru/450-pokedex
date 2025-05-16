import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemon(identifier: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${identifier}`).pipe(
      map(res => ({
        id: res.id,
        name: res.name,
        sprites: {
          frontDefault: res.sprites.front_default,
          frontShiny: res.sprites.front_shiny,
          backDefault: res.sprites.back_default,
          backShiny: res.sprites.back_shiny
        },
        stats: {
          hp: this.getBaseStat(res.stats, 'hp'),
          attack: this.getBaseStat(res.stats, 'attack'),
          defense: this.getBaseStat(res.stats, 'defense'),
          speed: this.getBaseStat(res.stats, 'speed'),
        },
        types: res.types.map((t: any) => ({
          name: t.type.name,
          color: this.getTypeColor(t.type.name)
        }))
      }))
    );
  }

  private getBaseStat(statsArray: any[], statName: string): number {
    const stat = statsArray.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  }

  private getTypeColor(typeName: string): string {
    const colors: Record<string, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    return colors[typeName] || '#777';
  }
}
