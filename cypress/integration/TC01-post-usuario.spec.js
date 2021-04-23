/// <reference types="cypress" />

describe('Criacao de usuario', () => {
    // beforeEach(() => { 

    // })   

    let userLogin = 'Grupo 2'
    let fullName = 'Grupo 2 de automacao'
    let userEmail = 'grupo2@automacaogft.com'
    let age = 25

    it('inserir informacoes', () => {

        cy.usrPage()

        // cy.visit('/')
        // cy.get('#users').click()
        // cy.get('#users')
        //     .should('be.visible')
        //     .click()


            // cy.contains('Este é o site do Prof. Robson Agapito.')
        cy.get('#btn-new').click()
        cy.get('#user_login').type(userLogin)
        cy.get('#user_full_name').type(fullName)
        cy.get('#user_email').type(userEmail)
        cy.get('#user_age').type(age)
        cy.get('#btn-save').click()

        cy.get('#notice').should('contain', 'Usuário foi criado com sucesso.')
    })

    it('Validar informacoes', () => {

        cy.get('#notice').should('contain', 'Usuário foi criado com sucesso.')
        cy.get('#login').should('contain', userLogin)
        cy.get('#full_name').should('contain', fullName)
        cy.get('#email').should('contain', userEmail)
        cy.get('#age').should('contain', age)

    })

    it('Validar inclusão - usando variáveis', () => {
        
        cy.get('#codigo').then((cod) => {
            const codusr = cod.text()
            expect(codusr).to.be.not.null
            cy.log(codusr)

            // Resolve primeiro a promise
            // cy.get('#codigo').then(pedro => {
            // var codNumber = pedro.text()
            // cy.log(codNumber)
            //})
            //
            //Chama direto a função e aguarda a promise ser resolvida
            //cy.get('#codigo').invoke('text').then(text => {
            //cy.log(text)
            //})
        })



        cy.get('#login').should('contain', userLogin)
        cy.get('#full_name').should('contain', fullName)
        cy.get('#email').should('contain', userEmail)
        cy.get('#age').should('contain', age)

    })

    it('Inclusão de usuário, utilizando Fixtures', () => {
        cy.visit('/')
        cy.get('#users')
            .should('be.visible')
            .click()
        cy.get('#btn-new').click()

        cy.fixture('novoUsr').then((usr) => {
            cy.get('#user_login').type(usr.userLogin)
            cy.get('#user_full_name').type(usr.fullName)
            cy.get('#user_email').type(usr.userEmail)
            cy.get('#user_age').type(usr.age)
        })

        cy.get('#btn-save').click()
        cy.get('#notice')
            .should('be.visible')
            .should('contain', 'Usuário foi criado com sucesso.')

    })

    it('Validação de inclusão - utilizando fixtures', () => {

        cy.get('#codigo').then(($cod) => {
            cy.writeFile('cypress/fixtures/userCod.json', $cod.text())
        })

        cy.readFile('cypress/fixtures/userCod.json').then(codUsr => {
            cy.log(codUsr)
            expect(codUsr).to.be.not.null
        })

        cy.fixture('novoUsr').then((usr) => {
            cy.get('#login').should('contain', usr.userLogin)
            cy.get('#full_name').should('contain', usr.fullName)
            cy.get('#email').should('contain', usr.userEmail)
            cy.get('#age').should('contain', usr.age)

            cy.get('.ls-btn-primary-danger').click()

        })



    })
})
