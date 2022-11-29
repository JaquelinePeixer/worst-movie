context("Dashboard Page", () => {

  it("List movie winners by year", () => {
    cy.visit("http://localhost:4200/")
    cy.get('input[name="searchYear"]').type('1982')
    cy.get('button[type="submit"]').click()
  })

})

context("List Movies Page", () => {

  it("Filter Year", () => {
    cy.visit("http://localhost:4200/list-movies")
    cy.get('input[name="filterYear"]').type('1982{enter}')
  })

  it("Filter Winner - Yes", () => {
    cy.visit("http://localhost:4200/list-movies")
    cy.get('select[name="filterWinner"]').select('Yes').should('have.value', 'true')
  })

  it("Filter Winner - No", () => {
    cy.visit("http://localhost:4200/list-movies")
    cy.get('select[name="filterWinner"]').select('No').should('have.value', 'false')
  })

  it("Filter Winner - Yes/No", () => {
    cy.visit("http://localhost:4200/list-movies")
    cy.get('select[name="filterWinner"]').select('Yes/No').should('have.value', '')
  })

})