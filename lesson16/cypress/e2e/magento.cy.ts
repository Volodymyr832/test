Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Magento Search Tests', () => {
  beforeEach(() => {
    cy.clearCookies();

    cy.visit('https://magento.softwaretestingboard.com/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('cookie-accepted', 'true');
      },
    });
  });

  it('Search for "jacket"', () => {
    cy.get('input#search', { timeout: 10000 })
      .should('be.visible')
      .type('jacket{enter}');

    cy.url({ timeout: 10000 }).should('include', 'catalogsearch/result');

    cy.get('.product-items', { timeout: 10000 }).should('exist');
    cy.get('.product-item', { timeout: 10000 }).should('have.length.at.least', 1);
  });

  it('Filter by category', () => {
    cy.visit('https://magento.softwaretestingboard.com/catalogsearch/result/?q=jacket', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('cookie-accepted', 'true');
      },
    });

    cy.get('.product-items', { timeout: 10000 }).should('exist');

    cy.contains('.filter-options-title', 'Category', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('.filter-options-content .item a', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click();

    cy.get('.product-items', { timeout: 10000 }).should('exist');
    cy.get('.product-item', { timeout: 10000 }).should('have.length.at.least', 1);

    cy.get('.filter-current', { timeout: 10000 }).should('contain', 'Category');
  });

  it('Maintains session after cookie acceptance', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cookie-accepted')).to.equal('true');
    });

    cy.getCookie('PHPSESSID').should('exist');
  });
});
