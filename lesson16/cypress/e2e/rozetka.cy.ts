describe('Rozetka Search Tests', () => {
    beforeEach(() => {
      cy.visit('https://rozetka.com.ua/', { failOnStatusCode: false });
    });
  
    it('Search for RZTK', () => {
      cy.get("input[name='search']").type('RZTK');
      cy.get("button.search-form__submit").click();
      cy.get('ul.catalog-grid').should('exist');
    });
  
    it('Filter by price', () => {
      cy.visit('https://rozetka.com.ua/search/?text=RZTK');
      cy.get("input[formcontrolname='min']").type('1000');
      cy.get("input[formcontrolname='max']").type('5000');
      cy.get("button.slider-filter__button").click();
      cy.get('ul.catalog-grid').should('exist');
    });
  });
  