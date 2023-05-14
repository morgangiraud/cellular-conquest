### init

- init Game.cells
- `setCells([...game.grid.cells])`

### handleCellClick

- `const newCells = [...cells]`
- update newCells pointers?
- `setCells(newCells)`

### handleValidation

- cells -> extrace cells state -> assignCells ===> deep copy game.cells

### State listemer gol mode

- game.update
- compute new states
- compute new territories
- assign variables cell.state & cell.territory
- `setCells([...game.grid.cells])`
