# 🚀 Testes de APIs Públicas com Cypress

Este repositório contém um conjunto de testes automatizados em **Cypress**, criados como estudo prático de **API Testing** e integração com **CI/CD**.

---

## 🔗 APIs testadas

- **Color API** (`colorapi.cy.js`)  
  Base URL: https://www.thecolorapi.com  
  Testes de conversão de cores (HEX, RGB, HSL, CMYK), esquemas de paletas, formatos HTML e SVG.

- **Dólar API Brasil** (`dolar.cy.js`)  
  Base URL: https://br.dolarapi.com  
  Testes de cotações do **USD**, **EUR** e consulta geral de moedas.

- **TheMealDB** (`meal.cy.js`)  
  Base URL: https://www.themealdb.com/api.php  
  Testes de busca de receitas pela primeira letra, validação de ingredientes e lookup por ID.

- **ServeRest** (`serverest.cy.js`)  
  Base URL: https://serverest.dev  
  Demonstração de um CRUD completo de usuários (**POST, GET, PUT, DELETE**) com autenticação e uso de token.

---

## ⚙️ Tecnologias

- [Node.js](https://nodejs.org/)  
- [Cypress](https://www.cypress.io/)  

---

## 📦 Integração Contínua (CI/CD)

O repositório inclui um exemplo de pipeline com GitHub Actions localizado em
.github/workflows/ci.yml.

## 🎯 Objetivo

Este projeto serve como case prático para estudo de:

Testes de API com Cypress

Estruturação de cenários em diferentes serviços públicos

Execução automática em pipelines de CI/CD no GitHub Actions
