describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'testUser',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    const user2 = {
      name: 'Test User 2',
      username: 'testUser2',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user2);

    cy.visit('http://localhost:3000');
  });

  it('front page can be openend', function() {
    cy.contains('blogs');
  });

  it('Login form is shown', function() {
    cy.contains('login').click();

    cy.contains('log in to application');
  });

  it('user can log in', function() {
    cy.contains('login').click();
    cy.get('#username').type('testUser');
    cy.get('#password').type('secret');
    cy.get('#login-button').click();

    cy.contains('testUser logged in');
  });

  it('user can\'t log in with wrong password', function() {
    cy.contains('login').click();
    cy.get('#username').type('testUser');
    cy.get('#password').type('wrongPassword');
    cy.get('#login-button').click();

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testUser', password: 'secret' });
      cy.createBlog({
        title: 'new title',
        author: 'new author',
        url: 'new url',
      });
    });

    it('a blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test url');
      cy.get('#submit-blog-button').click();

      cy.contains('test title by test author');
    });

    it('logged user can like a blog', function() {
      cy.contains('new title by new author')
        .get('#show-info')
        .click();

      cy.contains('likes:').should('contain', 0);

      cy.contains('new title by new author')
        .get('#like-button')
        .click();

      cy.contains('likes:').should('contain', 1);
    });

    it('logged user can delete blog', function() {
      cy.contains('new title by new author')
        .get('#show-info')
        .click();
      cy.contains('new title by new author')
        .get('#remove-button')
        .click();

      cy.get('html').should('not.contain', 'new title by new author');
    });

    describe('different user can\'t delete other\'s blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'new title 2',
          author: 'new author 2',
          url: 'new url 2',
        });

        cy.createBlog({
          title: 'new title 3',
          author: 'new author 3',
          url: 'new url 3',
        });

        cy.get('#log-out-button').click();
      });

      it('different can\'t delete other\'s blogs', function() {
        cy.login({ username: 'testUser2', password: 'secret' });

        cy.contains('new title by new author')
          .get('#show-info')
          .click();
        cy.contains('new title by new author')
          .get('#remove-button')
          .click();

        cy.get('html').should('contain', 'unauthorized access')
          .and('contain', 'new title by new author');
      });
    });

    describe('blogs are sorted in descending order according number of likes', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'new title 2',
          author: 'new author 2',
          url: 'new url 2',
          likes: 2,
        });

        cy.createBlog({
          title: 'new title 3',
          author: 'new author 3',
          url: 'new url 3',
          likes: 3,
        });
      });

      it('blogs are sorted correclty', function() {
        cy.get('[data-cy="blog-div"]').then(($blogs) => {
          console.log($blogs);
          cy.wrap($blogs).should('equal', $blogs.sort((a, b) => b.likes - a.likes));
        });
      });
    });
  });
});