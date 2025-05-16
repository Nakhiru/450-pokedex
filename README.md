# 📘 Pokémon Viewer – Documentation

This project is an Angular web app that uses the [PokéAPI](https://pokeapi.co/docs/v2) to display Pokémon data.  
It shows sprites (normal/shiny, front/back), stats, types, and navigating between Pokémon.

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

If you're still stuck, ask us ! 😊

---
