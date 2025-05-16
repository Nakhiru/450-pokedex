import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../model/pokemon.model';
import { Stats } from '../../model/stats.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  pokemonId!: number;
  pokemon?: Pokemon;

  statsList: { label: string; value: number }[] = [];

  showFront: boolean = true;

  isShiny: boolean = false;

  readonly MIN_ID = 1;
  readonly MAX_ID = 493;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (isNaN(id) || id < this.MIN_ID || id > this.MAX_ID) {
        this.router.navigate(['/pokemon', this.MIN_ID]);
        return;
      }
      this.pokemonId = id;
      this.fetchPokemon(id);
    });
  }

  fetchPokemon(id: number): void {
    this.pokemonService.getPokemon(id).subscribe({
      next: (data: Pokemon) => {
        this.pokemon = data;
        this.setStatsList(data.stats);
        this.showFront = true;
      },
      error: () => {
        this.router.navigate(['/pokemon', this.MIN_ID]);
      }
    });
  }

  setStatsList(stats: Stats): void {
    this.statsList = [
      { label: 'HP', value: stats.hp },
      { label: 'Attack', value: stats.attack },
      { label: 'Defense', value: stats.defense },
      { label: 'Speed', value: stats.speed },
    ];
  }

  get currentSprite(): string | null {
    if (!this.pokemon) return null;

    const sprites = this.pokemon.sprites;
    if (this.showFront && this.isShiny) return sprites.frontShiny;
    if (this.showFront && !this.isShiny) return sprites.frontDefault;
    if (!this.showFront && this.isShiny) return sprites.backShiny;
    return sprites.backDefault;
  }

  toggleShiny(): void {
    this.isShiny = !this.isShiny;
  }

  setFront(): void {
    this.showFront = true;
  }

  setBack(): void {
    this.showFront = false;
  }

  goToPrevious(): void {
    if (this.pokemonId > this.MIN_ID) {
      this.router.navigate(['/pokemon', this.pokemonId - 1]);
    }
  }

  goToNext(): void {
    if (this.pokemonId < this.MAX_ID) {
      this.router.navigate(['/pokemon', this.pokemonId + 1]);
    }
  }

  goToRandom(): void {
    const randomId = Math.floor(Math.random() * (this.MAX_ID - this.MIN_ID + 1)) + this.MIN_ID;
    this.router.navigate(['/pokemon', randomId]);
  }
}
