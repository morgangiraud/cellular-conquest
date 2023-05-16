# User session 1

The first user session happened:

- 2 players
- same interface
- Grid 20
- 3 possible selection

## Feedbacks

- The game was way too long
  - It was very hard to reach other player castle because you don't have capacity to act above the middle line
  - Only changing 3 squares is not enough to really impact the game
- ## Not enough information on screen so player were lost
- Feel quite random, needs more guidance on the updat rule

## Bugs

- One can unselect as many selected cells as one wants

## Changes to be made

To shorten the game

- move from 3 possible selection to 5 changes in general
  - the change from 3 to 5 is arbitrary, a better way of doing it will be to link this one to the bestiray
    - My intuition is that needing 2 turns to be able to create interesting structure will be a good spot
- Should implement the notion of changes
  - On can change any of his own territory cells
    - select AND unselect is one change
    - You can revert a change before validating
- extand user's territory
  - a user territory should be his own side + 1 square distance around any active cell
    - This will allow to act further than your own territory

Improve imformation

- Display in very light colors, the user's territory (where one can act)
- Display the immediate change (1 update)
  - What cells will be activated?
  - What cells will be desactivated?

Reduce randomness feeling

- Display a bestiary of known stable local form to help the users make conscious decisions on how to direct game updates
  - ex: The Square, the 3 square line, etc.

Bugs

- Fix user changes count
