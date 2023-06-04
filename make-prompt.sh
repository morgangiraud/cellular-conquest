#!/bin/bash

# This script prepares a prompt containing the code of the app for GPT-4

# Cleaning up the content of prompt.txt
# Clean up the content of prompt.txt if it exists
if [ -f prompt.txt ]; then
    rm prompt.txt
fi

echo """
The goal is to design an interactive web application that hosts a strategy game based on the principles of cellular automata. The game combines elements of strategy, territory control, and the biological theory of life as outlined by John Conway's Game of Life.

The game mechanics are as follows:

1. The game accommodates two players, referred to as Player A and Player B.
2. Each cell in the game can exist in one of three states: empty, occupied by Player A (marked as 'a'), or occupied by Player B (marked as 'b').
3. The transitions of the cells follow the rules of Conway's Game of Life, where 'a' and 'b' represent live cells. When a new cell is born, its type is determined by the majority of its neighboring cells.
4. The game grid is divided into two territories, each serving as the 'country' for one player. Within each country, there is a designated area known as the 'fortress'.
5. Each turn, both players are allowed to modify the state of up to three cells within their respective countries. After these modifications, the game evolves naturally for 100 iterations according to the rules of cellular automata.
6. The ultimate objective is to infiltrate the opponent's fortress. The first player to successfully place a cell within the fortress of the opposing player is declared the winner.

Enclosed in "------[]------" is the current state of the app written in typescript using the NextJs framework and tailwindcss:

------[]------
""" >> prompt.txt

# Adding Next config
echo "next.config.js" >> prompt.txt
echo '```' >> prompt.txt
cat next.config.js >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding tailwind config
echo "tailwind.config.js" >> prompt.txt
echo '```' >> prompt.txt
cat tailwind.config.js >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding globals.scss
echo "src/app/globals.css" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/globals.css >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding layout page
echo "src/app/layout.tsx" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/layout.tsx >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding GameContext context
echo "src/app/contexts/GameContext.tsx" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/contexts/GameContext.tsx >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding utils.ts
echo "src/utils.ts" >> prompt.txt
echo '```' >> prompt.txt
cat src/utils.ts >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding constants.ts
echo "src/constants.ts" >> prompt.txt
echo '```' >> prompt.txt
cat src/constants.ts >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding index page
echo "src/app/page.tsx" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/page.tsx >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding Grid component
echo "src/app/components/GridView.tsx" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/components/GridView.tsx >> prompt.txt
echo '```' >> prompt.txt

echo "" >> prompt.txt
echo "---" >> prompt.txt
echo "" >> prompt.txt

# Adding Cell component
echo "src/app/components/CellView.tsx" >> prompt.txt
echo '```' >> prompt.txt
cat src/app/components/CellView.tsx >> prompt.txt
echo '```' >> prompt.txt

echo '------[]------' >> prompt.txt


# Save the content of prompt.txt in the clipboard
cat prompt.txt | pbcopy
echo "The content of prompt.txt has been copied to the clipboard"