/// <reference types="cypress" />

describe('The Color API - testes de API', () => {

  // 1) Identificar/Converter cor via /id com HEX
  it('GET /id?hex=AC32F0 retorna nome e formatos', () => {
    cy.request('/id?hex=AC32F0').then((res) => {
      expect(res.status).to.eq(200);

      expect(res.body).to.have.property('name');
      expect(res.body.name).to.have.property('value');

      expect(res.body).to.have.property('hex');
      expect(res.body.hex).to.have.property('clean', 'AC32F0');

      expect(res.body).to.have.property('rgb');
      expect(res.body).to.have.property('hsl');
      expect(res.body).to.have.property('hsv');
      expect(res.body).to.have.property('cmyk');
    });
  });

  // 2) /id com RGB em string ou números
  it('GET /id?rgb=rgb(255,0,0) identifica RED', () => {
    cy.request('/id?rgb=rgb(255,0,0)').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.hex.clean).to.match(/^FF0000$/i);
      expect(res.body.name.value).to.be.a('string');
    });
  });

  // 3) Schemes: /scheme?hex=24B1E0&mode=triad&count=5
it('GET /scheme com seed + modo triad retorna lista de cores', () => {
  cy.request('/scheme?hex=24B1E0&mode=triad&count=5').then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('mode', 'triad');
    expect(res.body).to.have.property('count');

// converte string para número pq a API retorna count como string
    const count = parseInt(res.body.count, 10); 
    expect(count).to.eq(5);

    expect(res.body).to.have.property('colors');
    expect(res.body.colors).to.have.length(5);

    res.body.colors.forEach(c => {
      expect(c).to.have.property('hex');
      expect(c.hex).to.have.property('value');
      expect(c).to.have.property('name');
    });
  });
});


  // 4) SVG / HTML formats
  it('GET /id?format=svg&hex=00FFA6 retorna SVG', () => {
    cy.request('/id?format=svg&hex=00FFA6').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers['content-type']).to.include('image/svg+xml');
      expect(res.body).to.include('<svg');
    });
  });

  it('GET /id?format=html&hex=52362A retorna HTML', () => {
    cy.request('/id?format=html&hex=52362A').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers['content-type']).to.include('text/html');
      expect(res.body.toLowerCase()).to.include('<!doctype html');
    });
  });


  // 5) Mock example
  it('Mock: /id?hex=000000 devolve nome "Black"', () => {
    cy.intercept('GET', '**/id?hex=000000', {
      statusCode: 200,
      body: {
        hex: { clean: '000000', value: '#000000' },
        name: { value: 'Black' },
        rgb: { r: 0, g: 0, b: 0 }
      }
    }).as('black');

    cy.request('/id?hex=000000').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name.value).to.eq('Black');
    });
  });

});
