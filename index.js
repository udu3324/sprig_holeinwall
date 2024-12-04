/*
@title: Hole in Wall
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const floor = "f"
const sky = "s"

setLegend(
  [ 
    player, bitmap`
......000.......
.....00200......
...000222000....
.000222222200...
0022222222222000
000000000000000.
..00222222222200
..02222222222220
.002000020000020
.022222222222220
.022220222202220
.002220022202220
..02222000022220
..00222222222200
...000222222000.
.....00000000...`
],
[
  floor, bitmap`
4DDDDDDDDDD4DDDD
DDD4DDDDDDDDDDD4
DDDDDDDDDDD4DDDD
DDDDDD4DDDDDDD4D
DDDD4DDDDDDDDDDD
4DDDDDDDDDDD4DDD
DD4DDDDDDDDDDDDD
DDDD4DDDDD4DDDDD
DDD4DDDDDDDDDD4D
DDDDDDDDDDDDDDDD
DDD4DDDDD4DDDDDD
DDDD4DDDDDDDDDDD
DDDDDDDDDDDDDD4D
4DDDDDDD4DDDDDDD
DDDDD4DDDDDDDDDD
DDDDDDDD4DDDD4DD`
],
[sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`
  ]
)

setSolids([])

let level = 0
const levels = [
  map`
sssssssssssssss
sssssssssssssss
sssssssssssssss
sssfffffffffsss
sssfffffffffsss
sssfffffffffsss
sssfffffffffsss
sssfffffffffsss
sssfffffffffsss
sssssssssssssss
sssssssssssssss
sssssssssssssss`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let cantMove = false;

let started = false
function start() {
  if (started) {
    return
  }

  clearText()
  started = true
}

function lose() {

}

function checkOutOfBounds() {
  if (getFirst(player).y > 8 || getFirst(player).y < 3) {
    cantMove = true
    
    addText("You lost.", {x: 5, y: 1, color: color`2`})
    addText("Don't step off!", {x: 3, y: 2, color: color`f`})
  }
}

//display coordinates to zone things
function debug() {
  addText(`(${getFirst(player).x}, ${getFirst(player).y})`, {x: 0, y: 0, color: color`0`})
}

//when the game first starts
addText("Hole in Wall", {x: 4, y: 2, color: color`f`})
addText("Press any button", {x: 2, y: 13, color: color`2`})
addText("to start!", {x: 2, y: 14, color: color`2`})
addSprite(7, 6, player)

//controls
onInput("w", () => {
  start()
  if (cantMove) {
    return
  }
  getFirst(player).y -= 1
  debug()

  checkOutOfBounds()
})

onInput("a", () => {
  start()
  if (cantMove) {
    return
  }
  getFirst(player).x -= 1
  debug()

  checkOutOfBounds()
})

onInput("s", () => {
  start()
  if (cantMove) {
    return
  }
  getFirst(player).y += 1
  debug()

  checkOutOfBounds()
})

onInput("d", () => {
  start()
  if (cantMove) {
    return
  }
  getFirst(player).x += 1
  debug()

  checkOutOfBounds()
})

afterInput(() => {
  
})