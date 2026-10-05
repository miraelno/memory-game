# Memory Game

A classic card matching game. There are 16 cards (8 pairs) on the board. Open two cards per move and try to find all pairs in as few moves as possible.

Deploy: https://miraelno.github.io/memory-game/

## Features

- 16 cards are shuffled at the start of every game
- Moves and found pairs counters
- Victory modal with the number of moves
- Leaderboard with the top 10 results saved in `localStorage`
- "New Game" button restarts the game without page reload

## Technologies

- JavaScript (ES modules)
- CSS
- Vite
- ESLint

## How to run locally

1. Clone the repository:

```bash
git clone https://github.com/miraelno/memory-game.git
```

2. Go to the project folder and switch to the `memory-game` branch:

```bash
cd memory-game
git checkout memory-game
```

3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open the link from the terminal (usually http://localhost:5173).

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build the project to the `dist` folder
- `npm run preview` - preview the build
- `npm run lint` - check the code with ESLint
