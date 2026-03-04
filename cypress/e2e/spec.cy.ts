import randomJson from '../results/random.json'

describe('Some random test', () => {
  beforeEach('setup mocks', () => {
    cy.intercept("POST", "/api/postEndpoint", (req) => {
      req.reply({})
    }).as('postEndpoint')
  })

  it('has timeout issues on server', () => {
    cy.visit('/')
    cy.get('[name="input1"]').type("first value")
    cy.get('[name="input2"]').type("second value")
    cy.get('[name="input3"]').type("third value")
    cy.get('[role="button"]').click()

    cy.wait('@postEndpoint',).its('request.body').should('eql', {"value1":"first value","value2":"second value","value3":"third value", payload: randomJson})

  })
})