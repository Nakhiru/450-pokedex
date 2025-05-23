import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemon']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        PokemonComponent
      ],
      providers: [
        provideHttpClient(),
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '25' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');


    fixture.detectChanges();
  });

  // test unitaire #1
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

  // test d'integration #1
  it('should navigate to next and previous pokemon', () => {
    component.pokemonId = 25;
    component.pokemon = {
      id: 25,
      name: 'pikachu',
      sprites: {
        frontDefault: 'fd.png',
        frontShiny: 'fs.png',
        backDefault: 'bd.png',
        backShiny: 'bs.png'
      },
      stats: { hp: 35, attack: 55, defense: 30, speed: 90 },
      types: [{ name: 'electric', color: '#FFEA70' }]
    };
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('#next'));
    const prevButton = fixture.debugElement.query(By.css('#previous'));

    expect(nextButton).toBeTruthy();
    expect(prevButton).toBeTruthy();

    nextButton.nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith(['/pokemon', 26]);

    prevButton.nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith(['/pokemon', 24]);
  });

  // test d'integration #2 
  it('should fetch and set pokemon data and stats list on init', fakeAsync(() => {
  const mockPokemon = {
    id: 25, 
    name: 'pikachu',
    sprites: {
      frontDefault: 'fd.png',
      frontShiny: 'fs.png',
      backDefault: 'bd.png',
      backShiny: 'bs.png'
    },
    stats: {
      hp: 35,
      attack: 55,
      defense: 30,
      speed: 90
    },
    types: [{ name: 'electric', color: '#FFEA70' }]
  };

  mockPokemonService.getPokemon.and.returnValue(of(mockPokemon));

  component.ngOnInit();
  tick(); 

  expect(component.pokemonId).toBe(25);
  expect(mockPokemonService.getPokemon).toHaveBeenCalledWith(25);
  expect(component.pokemon).toEqual(mockPokemon);
  expect(component.statsList).toEqual([
    { label: 'HP', value: 35 },
    { label: 'Attack', value: 55 },
    { label: 'Defense', value: 30 },
    { label: 'Speed', value: 90 }
  ]);
  expect(component.showFront).toBeTrue();
  expect(navigateSpy).not.toHaveBeenCalled();
}));

});
