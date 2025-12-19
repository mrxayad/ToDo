describe('User Login Test', () => {
  it('Logs in a user with valid credentials', () => {
    cy.visit('http://localhost:5173/');  

    cy.get('input[name="name"]').type('Mohammed');  
    cy.get('input[name="email"]').type('md@hotmail.com');   
    cy.get('input[name="password"]').type('Hello@123');  
    cy.get('input[name="cnfpassword"]').type('Hello@123');  

    cy.get('button[type="submit"]').click();  

    cy.url().should('include', '/login');  
  });

});