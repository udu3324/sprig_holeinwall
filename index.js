/*
@title: Hole in Wall
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const floor = "f"
const sky = "s"

const wallT = "t"
const wallB = "b"
const wallL = "l"
const wallR = "r"

setLegend(
  [player, bitmap`
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
    .....00000000...`],
  [floor, bitmap`
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
    DDDDDDDD4DDDD4DD`],
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
    7777777777777777`],
  [wallT, bitmap`
    3333333333333333
    3......3...33..3
    33.....33...3..3
    333.....33.....3
    3.33.....33....3
    3..33.....33...3
    3...33.....33..3
    3.....33.....333
    3.33...333..3.33
    3..3........33.3
    3..333.3.....333
    33.....333.....3
    333......33....3
    3.33.......33..3
    3..333..3...33.3
    3333333333333333`],
  [wallB, bitmap`
    9999999999999999
    9......9...99..9
    99.....99...9..9
    999.....99.....9
    9.99.....99....9
    9..99.....99...9
    9...99.....99..9
    9.....99.....999
    99.99...99..9.99
    9..9........99.9
    9..999.9.....999
    99.....999.....9
    999......99....9
    9.99.......99..9
    9..999..9...99.9
    9999999999999999`],
  [wallL, bitmap`
    HHHHHHHHHHHHHHHH
    H......H...HH..H
    HH.....HH...H..H
    HHH.....HH.....H
    H.HH.....HH....H
    H..HH.....HH...H
    H...HH.....HH..H
    H.....HH.....HHH
    HH.HH...HH..H.HH
    H..H........HH.H
    H..HHH.H.....HHH
    HH.....HHH.....H
    HHH......HH....H
    H.HH.......HH..H
    H..HHH..H...HH.H
    HHHHHHHHHHHHHHHH`],
  [wallR, bitmap`
    CCCCCCCCCCCCCCCC
    C......C...CC..C
    CC.....CC...C..C
    CCC.....CC.....C
    C.CC.....CC....C
    C..CC.....CC...C
    C...CC.....CC..C
    C.....CC.....CCC
    C.CC...CCC..C.CC
    C..C........CC.C
    C..CCC.C.....CCC
    CC.....CCC.....C
    CCC......CC....C
    C.CC.......CC..C
    C..CCC..C...CC.C
    CCCCCCCCCCCCCCCC`],
)

setSolids([ player ])

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
  [ player ]: [],
  [ wallT ]: [ player],
  [ wallB ]: [ player],
  [ wallL ]: [ player],
  [ wallR ]: [ player],
})

//when the game first starts
addText("Hole in Wall", {x: 4, y: 2, color: color`f`})
addText("Press any button", {x: 2, y: 13, color: color`2`})
addText("to start!", {x: 2, y: 14, color: color`2`})
addSprite(7, 6, player)

let ended = false;

let started = false
function start() {
  if (started) {
    return
  }

  clearText()
  started = true
}

function checkOutOfBounds() {
  if (getFirst(player).y > 8 || getFirst(player).y < 3) {
    ended = true
    
    addText("You lost.", {x: 5, y: 1, color: color`2`})
    addText("Don't fall off!", {x: 3, y: 2, color: color`f`})

    addText("Press (right) down", {x: 2, y: 13, color: color`2`})
    addText("to restart!", {x: 2, y: 14, color: color`2`})
  }

  if (getFirst(player).x < 3 || getFirst(player).x > 11) {
    ended = true
    
    addText("You lost.", {x: 5, y: 1, color: color`2`})
    addText("Don't fall off!", {x: 3, y: 2, color: color`f`})

    addText("Press (right) down", {x: 2, y: 13, color: color`2`})
    addText("to restart!", {x: 2, y: 14, color: color`2`})
  }
}

function restart() {
  getFirst(player).x = 7
  getFirst(player).y = 6

  clearText()
  ended = false
  started = false
}

//1-9 holes top/bottom (3, 11)
//1-6 holes left/right (3, 8)
function addWall(side, holes) {
  let wallCluster = []
  let coordinates = []
  
  switch (side) {
    case "top": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [3, 4, 5, 6, 7, 8, 9, 10, 11]
      
      //randomly remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(0, 8)] = ""
      }

      //add it to the map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(coordinates[i], 0, wallT)
          addText(`add: ${coordinates[i]}, ${wallCluster[i]}`, {x: 2, y: 14, color: color`2`})
        }
      }

      break
    }
    case "bottom": {

      break
    }
    case "left": {

      break
    }
    case "right": {

      break
    }
  }
}

//generates a whole number between min-max
function randomRangeInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//display coordinates to zone things
function debug() {
  addText(`(${getFirst(player).x}, ${getFirst(player).y})`, {x: 0, y: 0, color: color`0`})
}

//left side buttons for movement
onInput("w", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).y -= 1
})

onInput("a", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).x -= 1
})

onInput("s", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).y += 1
})

onInput("d", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).x += 1
})

//right side buttons for game functions
onInput("i", () => {
  addWall("top", 5)
})

onInput("j", () => {
  addSprite(2, 2, wallB)
  addText('addded it', {x: 2, y: 14, color: color`2`})
})

onInput("k", () => {
  if (ended) {
    restart()
  }
})

onInput("l", () => {

})

afterInput(() => {
  debug()
  if (ended) {
    return
  }
  checkOutOfBounds()
})