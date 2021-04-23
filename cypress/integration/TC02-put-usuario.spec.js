describe('Editar usuário', () => {

    it('Acessar site', () => {
        cy.visit('/')
        cy.contains('Este é o site do Prof. Robson Agapito')
    });


    it('Alterar usuário', () => {

        cy.get('#users').should('be.visible').click()

        cy.readFile('cypress/fixtures/userCod.json').then(($code) => {
            cy.log($code)
            cy.get(`#btn-edit_${$code} > .ls-btn`).click()
        })

        cy.fixture('altUsr').then((usrA) => {
            cy.get('#user_login').clear().type(usrA.userLogin)
            cy.get('#user_full_name').clear().type(usrA.fullName)
            cy.get('#user_email').clear().type(usrA.userEmail)
            cy.get('#user_age').clear().type(usrA.age)
        })

        cy.get('#btn-save').click()

    })


    it('Validar usando fixtures', () => {

        cy.get('#notice').should('be.visible').should('have.text', 'Usuário foi atualizado com sucesso.')

        cy.readFile('cypress/fixtures/userCod.json').then((code) => {
            cy.get('#codigo').should('have.text', code)
        })

        cy.fixture('altUsr').then((usrA) => {
            cy.get('#login').should('have.text', usrA.userLogin)
            cy.get('#full_name').should('have.text', usrA.fullName)
            cy.get('#email').should('have.text', usrA.userEmail)
            cy.get('#age').should('have.text', usrA.age)
        })
    })
})