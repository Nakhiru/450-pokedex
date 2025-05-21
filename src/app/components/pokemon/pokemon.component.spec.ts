import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => "1" }) } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct sprite URL based on state', () => {
    component.pokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        frontDefault: 'fd.png',
        frontShiny: 'fs.png',
        backDefault: 'bd.png',
        backShiny: 'bs.png'
      },
      stats: { hp: 0, attack: 0, defense: 0, speed: 0 },
      types: []
    };

    component.showFront = true;
    component.isShiny = false;
    expect(component.currentSprite).toBe('fd.png');

    component.toggleShiny();
    expect(component.currentSprite).toBe('fs.png');

    component.setBack();
    expect(component.currentSprite).toBe('bs.png');

    component.toggleShiny();
    expect(component.currentSprite).toBe('bd.png');
  });
});
