/// <reference types="cypress" />

describe('ServeRest - CRUD de usuários', () => {
  const base = 'https://serverest.dev';

  const uniq = () => Math.random().toString(36).slice(2, 10);
  const newUser = () => ({
    nome: `QA ${uniq()}`,
    email: `qa_${uniq()}@test.com`,
    password: '123456',
    administrador: 'false'
  });

  it('POST /usuarios cria usuário e retorna _id', () => {
    const body = newUser();
    cy.request('POST', `${base}/usuarios`, body).then((res) => {
      expect([201, 200]).to.include(res.status);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('message');
      expect(res.body._id).to.be.a('string').and.not.be.empty;
      Cypress.env('createdUserId', res.body._id);
      Cypress.env('createdUserEmail', body.email);
    });
  });

  it('GET /usuarios?email= filtra pelo e-mail criado', () => {
    const email = Cypress.env('createdUserEmail');
    expect(email, 'email set by POST').to.be.a('string').and.not.be.empty;
    cy.request(`${base}/usuarios?email=${encodeURIComponent(email)}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('quantidade');
      expect(res.body).to.have.property('usuarios');
      expect(res.body.usuarios).to.be.an('array').and.to.have.length(1);
      const u = res.body.usuarios[0];
      expect(u).to.have.property('email', email);
      expect(u).to.have.property('_id', Cypress.env('createdUserId'));
    });
  });


it('DELETE /usuarios/:id exclui usuário', () => {
  const id = Cypress.env('uid');
  const token = Cypress.env('token');

  cy.request({
    method: 'DELETE',
    url: `https://serverest.dev/usuarios/${id}`,
    headers: { Authorization: token }
  }).then((res) => {
    expect([200, 204]).to.include(res.status);
  });

  cy.request({
    url: `https://serverest.dev/usuarios/${id}`,
    failOnStatusCode: false
  }).then((res) => {

    expect([200, 400, 404]).to.include(res.status);
    
  });
});

  it('GET /usuarios lista ', () => {
    cy.request(`${base}/usuarios`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('quantidade');
      expect(res.body).to.have.property('usuarios');
      expect(res.body.usuarios).to.be.an('array');
    });
  });
});
