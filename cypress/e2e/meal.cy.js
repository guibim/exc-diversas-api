/// <reference types="cypress" />

describe('TheMealDB - search by first letter', () => {
  const base = 'https://www.themealdb.com/api/json/v1/1';

  function assertMealShape(m) {
    expect(m).to.have.property('idMeal');
    expect(m).to.have.property('strMeal');
    expect(m).to.have.property('strCategory');
    expect(m).to.have.property('strArea');
    expect(m).to.have.property('strInstructions');
    expect(m).to.have.property('strMealThumb');
  }

  it('GET /search.php?f=a retorna lista de meals', () => {
    cy.request(`${base}/search.php?f=a`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('meals');
      expect(res.body.meals).to.be.an('array').and.to.have.length.greaterThan(0);
      res.body.meals.forEach((m) => assertMealShape(m));
    });
  });

  it('Cada meal possui ao menos 1 ingrediente preenchido', () => {
    cy.request(`${base}/search.php?f=a`).then((res) => {
      const meals = res.body.meals;
      const hasAnyIngredient = (meal) => {
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          if (ing && String(ing).trim()) return true;
        }
        return false;
      };
      meals.forEach((m) => expect(hasAnyIngredient(m)).to.eq(true));
    });
  });

  it('Lookup por id de um item do resultado funciona', () => {
    cy.request(`${base}/search.php?f=a`).then((res) => {
      const any = res.body.meals[0];
      cy.request(`${base}/lookup.php?i=${any.idMeal}`).then((res2) => {
        expect(res2.status).to.eq(200);
        expect(res2.body).to.have.property('meals');
        expect(res2.body.meals).to.be.an('array').and.to.have.length(1);
        const meal = res2.body.meals[0];
        expect(meal.idMeal).to.eq(any.idMeal);
        expect(meal.strMeal).to.be.a('string').and.not.be.empty;
      });
    });
  });
});
