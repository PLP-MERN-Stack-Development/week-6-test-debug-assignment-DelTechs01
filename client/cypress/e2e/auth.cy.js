describe('Auth E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('registers and logs in a user', () => {
    cy.intercept('POST', '/api/auth/register', { statusCode: 201 }).as('register');
    cy.intercept('POST', '/api/auth/login', { token: 'test-token' }).as('login');
    cy.intercept('GET', '/api/todos', []).as('getTodos');

    // Register
    cy.get('[data-testid="register-email"]').type('test@example.com');
    cy.get('[data-testid="register-password"]').type('password');
    cy.get('[data-testid="register-button"]').click();
    cy.wait('@register');

    // Login
    cy.get('[data-testid="login-email"]').type('test@example.com');
    cy.get('[data-testid="login-password"]').type('password');
    cy.get('[data-testid="login-button"]').click();
    cy.wait('@login');
    cy.wait('@getTodos');

    cy.get('[data-testid="todo-input"]').should('be.visible');
  });

  it('shows error for invalid login', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401, body: { error: 'Invalid credentials' } }).as('login');
    cy.get('[data-testid="login-email"]').type('wrong@example.com');
    cy.get('[data-testid="login-password"]').type('wrong');
    cy.get('[data-testid="login-button"]').click();
    cy.wait('@login');
    cy.get('[data-testid="login-error"]').should('have.text', 'Invalid credentials');
  });
});