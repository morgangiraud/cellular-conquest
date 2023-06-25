# Cellular Conquest: Ode to the Odyssey of Evolution

## About

The goal is to design an interactive web application that hosts a strategy game based on the principles of cellular automata. The game combines elements of strategy, territory control, and the biological theory of life as outlined by John Conway's Game of Life.

In a realm unseen by the naked eye, a grand saga unfolds. A timeless universe, teeming with life, its very fabric woven from the elegant simplicity of cellular automata. This is the world of "Cellular Conquest: Ode to the Odyssey of Evolution," a realm where life's most fundamental units are the prime movers of power and strategy. Two forces, the kingdoms of Player A and Player B, vie for supremacy in this microscopic cosmos, each embarking on their odyssey of evolution, where the emergence of complex patterns from simple rules forms the basis of their grand strategy.

These kingdoms, bound by the primal rules of life and death, have harnessed the power of cellular evolution, transforming it into a weapon of conquest. The empty cells, the lifeless expanse, await the touch of life, ready to bloom in the colors of the kingdom that claims them. At the heart of each kingdom lies the fortress, the stronghold of cellular life, the prize that the other covets. In this dance of domination, each turn, each evolution is a verse in the grand ode to life's game. The ultimate objective is no less than the very essence of existence itself - to evolve, to adapt, to conquer.

## Game mechanics

1. The game accommodates two players, referred to as Player A and Player B.
2. Each cell in the game can exist in one of three states: empty, occupied by Player A (marked as 'a'), or occupied by Player B (marked as 'b').
3. The transitions of the cells follow the rules of Conway's Game of Life, where 'a' and 'b' represent live cells. When a new cell is born, its type is determined by the majority of its neighboring cells.
4. The game grid is divided into two territories, each serving as the 'country' for one player. Within each country, there is a designated area known as the 'fortress'.
5. Each turn, both players are allowed to modify the state of up to three cells within their respective countries. After these modifications, the game evolves naturally for 100 iterations according to the rules of cellular automata.
6. The ultimate objective is to infiltrate the opponent's fortress. The first player to successfully place a cell within the fortress of the opposing player is declared the winner.

## installation

`yarn`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## Todo

inspiration: https://2048game.com/

- multiplayer
  - forbid the capacity to play over another player move
- Idea
  - implement the real time game mode
- share

### Colors

https://coolors.co/613a3a-1d3523-cfc0b4-0ae4eb-f89225
