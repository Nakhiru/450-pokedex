describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PokemonComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => "1" }) } },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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


  it('should navigate to next pokemon when goToNext is called', () => {
    component.pokemonId = 25;
    component.goToNext();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokemon', 26]);
  });
});
