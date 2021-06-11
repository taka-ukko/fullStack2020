describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Ukkeli',
      username: 'uggels',
      password: 'ryysvuori'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('uggels')
      cy.get('#password').type('ryysvuori')
      cy.get('#login-button').click()

      cy.contains('Testi Ukkeli logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('uggelsonni')
      cy.get('#password').type('ryysvuori123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Testi Ukkeli logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('uggels')
      cy.get('#password').type('ryysvuori')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('test-title')
      cy.get('#authorInput').type('test-author')
      cy.get('#urlInput').type('test-url')
      cy.get('#submit-button').click()
      cy.get('html').should('contain', 'test-title / test-author')
    })

    it('A blog can be liked', function() {
      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('test-title')
      cy.get('#authorInput').type('test-author')
      cy.get('#urlInput').type('test-url')
      cy.get('#submit-button').click()

      cy.get('.viewButton').click()

      cy.contains('test-url').contains('0')
      cy.get('.likeButton').click()
      cy.contains('test-url').contains('1')
      cy.get('.likeButton').click()
      cy.contains('test-url').contains('2')


    })

    it('A blog can removed', function() {
      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('test-title')
      cy.get('#authorInput').type('test-author')
      cy.get('#urlInput').type('test-url')
      cy.get('#submit-button').click()

      cy.get('.viewButton').click()

      cy.contains('test-url').contains('remove').click()

      cy.get('html').should('not.contain', 'test-title / test-author')
    })

    it('blogs are order by likes', function() {
      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('title1')
      cy.get('#authorInput').type('author1')
      cy.get('#urlInput').type('url1')
      cy.get('#submit-button').click()


      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('title2')
      cy.get('#authorInput').type('author2')
      cy.get('#urlInput').type('url2')
      cy.get('#submit-button').click()

      cy.contains('create a new blog').click()
      cy.get('#titleInput').type('title3')
      cy.get('#authorInput').type('author3')
      cy.get('#urlInput').type('url3')
      cy.get('#submit-button').click()

      cy.contains('title1 / author1').contains('view').click()
      cy.wrap(new Array(1)).each(() => {
        cy.contains('url1').contains('like').click()
      })

      cy.get('.defaultView:first').should('contain', 'title1 / author1')

      cy.contains('title2 / author2').contains('view').click()
      cy.wrap(new Array(2)).each(() => {
        cy.contains('url2').contains('like').click()
      })

      cy.get('.defaultView:first').should('contain', 'title2 / author2')

      cy.contains('title3 / author3').contains('view').click()
      cy.wrap(new Array(3)).each(() => {
        cy.contains('url3').contains('like').click()
      })

      cy.get('.defaultView:first').should('contain', 'title3 / author3')
      cy.get('.defaultView:last').should('contain', 'title1 / author1')

      cy.wrap(new Array(3)).each(() => {
        cy.contains('url1').contains('like').click()
      })

      cy.get('.defaultView:first').should('contain', 'title1 / author1')
      cy.get('.defaultView:last').should('contain', 'title2 / author2')

    })


  })
})