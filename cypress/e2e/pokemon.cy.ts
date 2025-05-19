describe('Pokémon Detail Page', () => {
    const pokemonId = 25; // Pikachu

    beforeEach(() => {
        cy.visit(`/pokemon/${pokemonId}`);
    });

    it('displays the right Pokémon and stats', () => {
        cy.get('[id="pokemon-name"]').should('contain', 'Pikachu');
        cy.contains('.stat', 'HP:').should('contain.text', '35');
        cy.contains('.stat', 'Attack:').should('contain.text', '55');
        cy.contains('.stat', 'Defense:').should('contain.text', '40');
        cy.contains('.stat', 'Speed:').should('contain.text', '90');
    });

    it('navigates to the next Pokémon', () => {
        cy.get('[id="next"]').click();
        cy.url().should('include', '/pokemon/26');
        cy.get('[id="pokemon-name"]').should('contain', 'Raichu');
    });

    it('navigates to the previous Pokémon', () => {
        cy.get('[id="previous"]').click();
        cy.url().should('include', '/pokemon/24');
        cy.get('[id="pokemon-name"]').should('contain', 'Arbok');
    });

    it('navigates to a random Pokémon', () => {
        cy.get('[id="random"]').click();
        cy.url().should('match', /\/pokemon\/\d+/);
        cy.get('[id="pokemon-name"]').should('not.be.empty');
    });

    it('switches between front and back sprites', () => {
        cy.get('[id="back"]').click();
        cy.get('[id="pokemon-sprite"]').should('have.attr', 'src').and('include', 'back');
        cy.get('[id="front"]').click();
        cy.get('[id="pokemon-sprite"]').should('have.attr', 'src').and('not.include', 'back');
    });

    it('toggles between shiny and normal sprites', () => {
        cy.get('[id="shiny-toggle"]').click({force: true});
        cy.get('[id="pokemon-sprite"]').should('have.attr', 'src').and('include', 'shiny');
        cy.get('[id="shiny-toggle"]').click({force: true});
        cy.get('[id="pokemon-sprite"]').should('have.attr', 'src').and('not.include', 'shiny');
    });

});
