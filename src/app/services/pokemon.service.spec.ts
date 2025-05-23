import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());
// test unitaire #1
  it("should fetch and transform Pokemon data correctly", () => {
    const mockResponse = {
      id: 25,
      name: 'pikachu',
      sprites: {
        front_default: 'front.png',
        front_shiny: 'front-shiny.png',
        back_default: 'back.png',
        back_shiny: 'back-shiny.png'
      },
      stats: [
        { stat: { name: 'hp' }, base_stat: 35 },
        { stat: { name: 'attack' }, base_stat: 55 },
        { stat: { name: 'defense' }, base_stat: 40 },
        { stat: { name: 'speed' }, base_stat: 90 }
      ],
      types: [
        { type: { name: 'electric' } }
      ]
    };

    service.getPokemon(25).subscribe(pokemon => {
      expect(pokemon.name).toBe("pikachu");
      expect(pokemon.sprites.frontShiny).toBe('front-shiny.png');
      expect(pokemon.stats.hp).toBe(35);
      expect(pokemon.types[0].name).toBe('electric');
      expect(pokemon.types[0].color).toBe('#F7D02C');
    });

    const req = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon/25");
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });
});
