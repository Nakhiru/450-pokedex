import { Routes } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon/1', pathMatch: 'full' },
  { path: 'pokemon/:id', component: PokemonComponent },
];
