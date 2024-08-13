
describe("Testing the Airalo App",()=>{

beforeEach(() => {
    cy.fixture('package_details.json').as('packageData');
    cy.visit('/');
  });


it("To verify the Airalo eSim plan for country Japan",()=>
{
cy.get('#onetrust-accept-btn-handler').click();
cy.get('#onetrust-accept-btn-handler').should('not.be.visible');

cy.wait(2000);
cy.get('#wzrk-cancel').click();
cy.get('.tw-absolute > .btn').click()
cy.get('[data-testid="search-input"]').type('Japan')
cy.get('[data-testid="search-input"]').should("have.value","Japan")

cy.get('.countries-list').find("span[data-testid='Japan-name']").should("be.visible")
cy.get('.countries-list').find("span[data-testid='Japan-name']").click()

cy.get(":nth-child(1) > [data-testid='sim-package-item']").find(".c--sim_item > .sim-item-bottom > [data-testid='esim-button'] > .btn").click()


//Validations
cy.get('@packageData').then((packageData) => {

      cy.get('[data-testid="sim-detail-operator-title"] > p').should('contain', packageData.title);

      cy.get('[data-testid="COVERAGE-value"]').should('contain', packageData.coverage);
      cy.get('[data-testid="DATA-value"]').should('contain', packageData.data);
      cy.get('[data-testid="VALIDITY-value"]').should('contain', packageData.validity);
      cy.get('[data-testid="PRICE-value"]').should('contain', packageData.price);

});
  });
});











