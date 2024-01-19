describe('AllPosts Page', () => {
    const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvdWkiLCJpYXQiOjE3MDU2NzQyNjgsImV4cCI6MTcwNTY3Nzg2OCwicm9sZXMiOlsiVVNFUiJdLCJ1c2VySWQiOjE0fQ.NIj_W6lq_08Kt4hBjtLyY0svBecnaoY_EqdN7BPFNNc';
    const claims = { sub: 'oui', iat: 1704373038, exp: 1704376638, roles: ['USER'], userId: 14 };
  
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/posts', {
        fixture: 'posts.json',
      }).as('getAllPosts');
      
      cy.visit('http://localhost:5173/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('accessToken', authToken);
          win.localStorage.setItem('claims', JSON.stringify(claims));
        },
      });
      // cy.wait('@getAllPosts');
    });
  
    it('should display posts correctly', () => {
      cy.get('[data-testid=post-item]').should('have.length', 5);
    });
  });