require('cypress-xpath')
const user = './cypress/integration/user.json'

describe("Product purchase with newly created user", () => {
    it("Purchase two products", () => {
        cy.visit("http://automationpractice.com/index.php")
        cy.get(".login").click();
        cy.readFile(user).then((obj) => {
            cy.get("#email").type(obj.email);
            cy.get("#passwd").type(obj.password);
        })
        cy.get("#SubmitLogin", { timeout: 10000 }).should('be.visible').click();
        cy.xpath("//input[@id='search_query_top']", { timeout: 10000 }).should('be.visible').type("dress")
        cy.get("[name=submit_search]").click()
        cy.get('#selectProductSort').select('price:asc')
        cy.get('.ajax_add_to_cart_button', { timeout: 10000 }).should('be.visible').eq(1).click()
        cy.get('[title="Continue shopping"]').click()
        cy.get('.sf-with-ul').eq(0).click()
        cy.get('.CLOSE').eq(0).click()
        cy.get('.last').eq(0).click()
        cy.get('.color_pick').eq(1).click()
        Cypress.on('uncaught:exception', function (err, runnable) {
            return false
        })
        cy.get('.form-control').eq(1).select('M')
        cy.wait(2500).get(".exclusive").eq(1).click()
        cy.wait(1500).get('[title="Proceed to checkout"]').eq(1).click()
        cy.get('.button-medium').eq(1).click()
        cy.get('[for="cgv"]').click()
        cy.get('[name=processCarrier]', { timeout: 10000 }).should('be.visible').click()
        cy.get('.cheque').click()
        cy.xpath("//span[contains(text(),'I confirm my order')]", { timeout: 10000 }).should('be.visible').click()
        cy.contains("Your order on My Store is complete.")
        cy.get('.logout', { timeout: 10000 }).should('be.visible').click()
    })
})