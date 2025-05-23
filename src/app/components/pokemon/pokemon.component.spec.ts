import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), 
        PokemonComponent
      ],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '25' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
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

it('should toggle sprites correctly (front, back, shiny)', () => {
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

  const shinyToggle = fixture.debugElement.query(By.css('#shiny-toggle'));
  const backButton = fixture.debugElement.query(By.css('#back'));
  const frontButton = fixture.debugElement.query(By.css('#front'));

  expect(shinyToggle).toBeTruthy();
  expect(backButton).toBeTruthy();
  expect(frontButton).toBeTruthy();

 
  shinyToggle.nativeElement.click();
  fixture.detectChanges();
  expect(component.currentSprite).toBe('fs.png');

  
  backButton.nativeElement.click();
  fixture.detectChanges();
  expect(component.currentSprite).toBe('bs.png');


  shinyToggle.nativeElement.click();
  fixture.detectChanges();
  expect(component.currentSprite).toBe('bd.png');

  
  frontButton.nativeElement.click();
  fixture.detectChanges();
  expect(component.currentSprite).toBe('fd.png');
});

});


