const faker = require("faker")
const selector = require('../selectors/TC1')

describe("Creating new user", () => {
    it("Visit site", () => {
        cy.visit("http://automationpractice.com/index.php")
        cy.title().should("eq", "My Store")
    })

    it("Sign up", () => {
        let phone = "0197" + Math.floor(Math.random() * (9999999 - 1000000) + 1)
        let password = faker.random.alphaNumeric(8)
        let email = faker.internet.email()
        cy.get(selector.btnSignIn).click()
        cy.get(selector.fieldEmail).type(email)
        cy.get(selector.doSubmit, { timeout: 10000 }).should('be.visible').click()
        cy.get(selector.btnGender, { timeout: 10000 }).should('be.visible').click()
        cy.get(selector.firstName).type(faker.name.firstName())
        cy.get(selector.lastName).type(faker.name.lastName())
        cy.get(selector.pass).type(password)
        cy.get(selector.address).type(faker.address.streetAddress())
        cy.get(selector.city).type(faker.address.city())
        cy.get(selector.state).select(`${Math.floor(Math.random() * (45 - 1) + 1)}`)
        cy.get(selector.zipcode).type("10001")
        cy.get(selector.phone).type(phone)
        cy.get(selector.alias).clear().type("Sherlock")
        cy.get(selector.btnCreate, { timeout: 10000 }).should('be.visible').click()
        cy.contains("Sign out")

        cy.readFile('cypress/fixtures/user.json').then((obj) => {
            obj.email = email
            obj.password = password
            cy.writeFile('cypress/fixtures/user.json', obj)
        })
    })
})