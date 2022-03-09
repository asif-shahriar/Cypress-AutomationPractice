const faker = require("faker")
const user = './cypress/integration/user.json'
//const {selectors}=require('../selectors/TC1')


describe("Creating new user", () => {
    it("Visit site", () => {
        cy.visit("http://automationpractice.com/index.php")
        cy.title().should("eq", "My Store")
    })

    it("Sign up", () => {
        let phone = "0197" + Math.floor(Math.random() * (9999999 - 1000000) + 1)
        let password = faker.random.alphaNumeric(8)
        let email = faker.internet.email()
        cy.get(".login").click()
        cy.get("#email_create").type(email)
        cy.get("#SubmitCreate", { timeout: 10000 }).should('be.visible').click()
        cy.get("#id_gender1", { timeout: 10000 }).should('be.visible').click()
        cy.get("#customer_firstname").type(faker.name.firstName())
        cy.get("#customer_lastname").type(faker.name.lastName())
        cy.get("#passwd").type(password)
        cy.get('#address1').type(faker.address.streetAddress())
        cy.get('#city').type(faker.address.city())
        cy.get('#id_state').select(`${Math.floor(Math.random() * (45 - 1) + 1)}`)
        cy.get("#postcode").type("10001")
        cy.get('#phone_mobile').type(phone)
        cy.get('#alias').clear().type("Sherlock")
        cy.get("#submitAccount", { timeout: 10000 }).should('be.visible').click()
        cy.contains("Sign out")

        cy.readFile(user).then((obj) => {
            obj.email = email
            obj.password = password
            cy.writeFile(user, obj)
        })
    })
})