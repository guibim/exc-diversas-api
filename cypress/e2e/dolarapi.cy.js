/// <reference types="cypress" />

describe('br.dolarapi.com - cotações', () => {
  const base = 'https://br.dolarapi.com';

  function assertQuoteShape(q) {
    expect(q).to.have.all.keys(
      'compra',
      'venda',
      'fechoAnterior',
      'nome',
      'moeda',
      'dataAtualizacao'
    );
    expect(q.compra).to.be.a('number');
    expect(q.venda).to.be.a('number');
    expect(q.fechoAnterior).to.be.a('number');
    expect(q.nome).to.be.a('string');
    expect(q.moeda).to.be.a('string');
    expect(q.dataAtualizacao).to.be.a('string');
  }

  it('GET /v1/cotacoes retorna lista', () => {
    cy.request(`${base}/v1/cotacoes`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.to.have.length.greaterThan(0);
      res.body.forEach((q) => assertQuoteShape(q));
    });
  });

  it('GET /v1/cotacoes/usd retorna cotação do dólar', () => {
    cy.request(`${base}/v1/cotacoes/usd`).then((res) => {
      expect(res.status).to.eq(200);
      if (Array.isArray(res.body)) {
        expect(res.body.length).to.be.greaterThan(0);
        res.body.forEach((q) => assertQuoteShape(q));
      } else {
        assertQuoteShape(res.body);
        expect(res.body.moeda.toUpperCase()).to.eq('USD');
      }
    });
  });

  it('GET /v1/cotacoes/eur retorna cotação do euro', () => {
    cy.request(`${base}/v1/cotacoes/eur`).then((res) => {
      expect(res.status).to.eq(200);
      if (Array.isArray(res.body)) {
        expect(res.body.length).to.be.greaterThan(0);
        res.body.forEach((q) => assertQuoteShape(q));
      } else {
        assertQuoteShape(res.body);
        expect(res.body.moeda.toUpperCase()).to.eq('EUR');
      }
    });
  });

  it('GET moeda inválida retorna 404 ou 400', () => {
    cy.request({ url: `${base}/v1/cotacoes/xxx`, failOnStatusCode: false }).then((res) => {
      expect([404, 400]).to.include(res.status);
    });
  });
});
