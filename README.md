# 📘 Pokémon Viewer – Documentation

This project is an Angular web app that uses the [PokéAPI](https://pokeapi.co/docs/v2) to display Pokémon data.
It shows sprites (normal/shiny, front/back), stats, types, and navigating between Pokémon.

---

## Table of Contents

- [📘 Pokémon Viewer – Documentation](#-pokémon-viewer--documentation)
  - [Table of Contents](#table-of-contents)
  - [🚀 Quick Start](#-quick-start)
    - [✅ Prerequisites](#-prerequisites)
    - [📦 Install the App](#-install-the-app)
    - [▶️ Run the App](#️-run-the-app)
  - [🔍 Features](#-features)
    - [User Story](#user-story)
      - [Acceptance Criteria](#acceptance-criteria)
  - [🧪 Run Tests](#-run-tests)
    - [Unit Tests](#unit-tests)
    - [Integration Tests](#integration-tests)
    - [E2E Testing](#e2e-testing)
  - [Tech Stack](#tech-stack)
  - [❓ FAQs](#-faqs)
  - [🧑‍💻 Need Help?](#-need-help)

---

## 🚀 Quick Start

### ✅ Prerequisites

Install the following:

1. **Node.js (LTS version)**
   [Download Node.js](https://nodejs.org/) and install it (includes `npm`).

2. **Angular CLI**
   Install Angular CLI globally:

   ```bash
   npm install -g @angular/cli
   ```

---

### 📦 Install the App

Clone this repo and install dependencies:

```bash
git clone https://github.com/Nakhiru/450-pokedex.git
cd 450-pokedex
npm install
```

---

### ▶️ Run the App

Start the development server:

```bash
ng serve
```

Then open your browser and go to:

```
http://localhost:4200
```

---

## 🔍 Features

- View any Pokémon from ID `1` to `493`
- Toggle **shiny / normal** sprites
- Switch between **front / back** views
- See base stats and type pills with color
- Navigate with **previous / next / random** buttons
- URL reflects current Pokémon ID (`/pokemon/25`)
- Invalid IDs (e.g. `/pokemon/0`, `/pokemon/999`) redirect to `/pokemon/1`

### User Story

**Title**: Fetch Pokemon data by ID from the PokéAPI

**As a** user of the Pokémon application,
**I want** the application to fetch and display data for a specific Pokémon using its ID,
**So that** I can see stats, sprite images, and type information for that Pokémon in real time.

#### Acceptance Criteria

1. **Data Retrieval**:
   - Given a valid Pokémon ID (e.g., 25),
   - When the application makes a request to the PokéAPI,
   - Then it should retrieve and map the response into the internal Pokemon model with name, sprites, stats, and types.
2. **Error Handling**
   - Given an invalid ID (non-numeric or out of range),
   - When the request is made,
   - Then the app should redirect the user to a fallback Pokémon.
3. **Sprite Mapping**
   - All front/back, shiny/normal sprite URLs should be correctly parsed from the API response and displayed.
4. **Stat Mapping**
   - HP, Attack, Defense, and Speed should be extracted from the API's stats array and displayed clearly in the UI.
5. **Type Color Mapping**
   - Each type should be mapped to a predefined color internally and shown in the UI (e.g., electric → `#F7D02C`).
6. **Testing**
   - The implementation is tested and behaves as expected.

---

## 🧪 Run Tests

### Unit Tests

Karma and Jasmine are used for the unit tests. Follow the steps below to get started:

Make sure the app is running:

```bash
ng serve
```

Start the tests in another terminal:

```bash
ng test
```

This should open [http://localhost:9876](http://localhost:9876) containing the Karma UI as well as show the tests results.

### Integration Tests

Karma and Jasmine are used for the integration tests. Follow the steps below to get started:

Make sure the app is running:

```bash
ng serve
```

Start the tests in another terminal:

```bash
ng test
```

This should open [http://localhost:9876](http://localhost:9876) containing the Karma UI as well as show the tests results.


### E2E Testing

Cypress is used for end-to-end (E2E) testing in this project. Follow the steps below to get started:

Install Cypress into the project

```bash
npm install cypress --save-dev
```

Make sure the app is running using:

```bash
ng serve
```

Run this command to open Cypress UI

```bash
npx cypress open
```

Then:

1. Select `E2E Testing`
2. Choose your preferred browser
3. Click `Start E2E Testing in ...`
4. In the Cypress interface, select `pokemon.cy.ts` to run the test suite

---

Or, run this command if you want to automatically run the tests and get a report in the terminal

```bash
npx cypress run
```

---

## Tech Stack

- **Node.js** for dependency management and build tooling (via [npm](https://www.npmjs.com/)).
- **Angular** web app that uses the [PokéAPI](https://pokeapi.co/docs/v2) to display Pokémon data.
- **Unit and integration testing** with [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/latest/index.html).
- **End-to-end (E2E) testing** using [Cypress](https://www.cypress.io/).

---

## ❓ FAQs

**Q: Why does visiting `/pokemon/0` or `/pokemon/999` redirect me to `/pokemon/1`?**
A: Only Pokémon IDs from `1` to `493` are supported in this app.

**Q: How do I change Pokémon?**
A: Use the navigation buttons (Next, Previous, Random) or change the URL manually, e.g. `/pokemon/25` for Pikachu.

---

## 🧑‍💻 Need Help?

Ensure:

- You are using Node.js version `>= 18`
- You installed Angular CLI globally with `npm install -g @angular/cli`
- You ran `npm install` before `ng serve`
- If the Cypress UI fails to open with `npx cypress open`, simply run these tests using `npx cypress run`

If you're still stuck, ask us ! 😊

---
