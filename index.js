/*
@title: Hole in Wall
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const floor = "f"
const floor2 = "a"
const floor3 = "d"
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
    [floor2, bitmap`
      .7....7.7.7.7...
      7.7..77..77...7.
      .7.77.7.7.7....7
      7.7.77..77..77..
      ..77..7..7...7.7
      .7....777.77...7
      .77.77...7...7..
      ...7.77.77.....7
      7..7....7..77..7
      ...7...7.7..7.7.
      .7...7..7.77..7.
      .7.......7..7..7
      7..7..77...7....
      ...7..777.....7.
      77..77...77.77..
      7....7..77....77`],
    [floor3, bitmap`
      .7.77.7.777.7...
      777..7777777777.
      .7.777777.77.777
      777.777777..77..
      77777.7..7..77.7
      77777.777.777..7
      777.77.7777.77..
      77.7777.77.777.7
      7.777...77.777.7
      7.77.7777777777.
      7777.77.7777777.
      7777.7...7..7.77
      77.77.777.777.7.
      .7.77.777.77..7.
      77777777777.777.
      7...77..77777777`],
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
)

setSolids([ player, wallT, wallB, wallL, wallR ])

let level = 0
const levels = [
  map`
sssssssssssssss
sssssssssssssss
sssssssssssssss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
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

setBackground(floor)

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
  //remove all walls left over
  for (const wallType of [wallT, wallB, wallL, wallR]) {
    for (const wall of getAll(wallType)) {
      wall.remove()
    }
  }

  //add player back, but they might be gone
  if (getFirst(player) === undefined) {
    addSprite(7, 6, player)
  } else {
    getFirst(player).x = 7
    getFirst(player).y = 6
  }

  //done
  clearText()
  ended = false
  started = false
}

//1-9 holes top/bottom (3, 11)
//1-6 holes left/right (3, 8)

function animateWall(ms, ticks, wallCluster, coordinates, wallType) {
  for (let t = 0; t < ticks; t++) {
    //for every ms, move the cluster one tile
    setTimeout(() => {
      //the cluster moved fully to the end. delete it
      if (t === (ticks - 1)) {
        for (let i = 0; i < wallCluster.length; i++) {
          //find the final place that the tile will move to
          let finalPlace = 0
          switch (wallType) {
            case wallT: {
              finalPlace = 11
              break
            }
          }
          
          //only remove specific type of tile
          const tileList = getTile(coordinates[i], finalPlace)
          for (const tile of tileList) {
            if (tile.type === wallType) {
              tile.remove()
            }
          }
        }
      } else {
        //for each tile in cluster
        for (let i = 0; i < wallCluster.length; i++) {
          if (wallCluster[i] !== "") {
            //only move specific type of tile
            const tileList = getTile(coordinates[i], t)
            for (const tile of tileList) {
              if (tile.type === wallType) {
                switch (wallType) {
                  case wallT: {
                    tileList[0].y += 1
                    break
                  }
                  case wallB: {
                    tileList[0].y -= 1
                    break
                  }
                }
              }
            }
          }
        }
        checkOutOfBounds()
      }
    }, ms * (t + 1))
  }
}

function addWall(side, holes, ms) {
  let wallCluster = []
  let coordinates = []
  
  switch (side) {
    case "top": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      
      //randomly remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 11)] = ""
      }

      //add it to the map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(coordinates[i], 0, wallT)
          //addText(`add: ${coordinates[i]}, ${wallCluster[i]}`, {x: 2, y: 14, color: color`2`})
        }
      }
      
      //animate going down
      let tick = 0
      for (let y = 0; y < 12; y++) {
        //for every ms, move the cluster one tile
        setTimeout(() => {
          //the cluster moved fully to the end. delete it
          if (y === 11) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(coordinates[i], 11)
              for (const tile of tileList) {
                if (tile.type === wallT) {
                  tile.remove()
                }
              }
            }
          } else {
            //for each tile in cluster
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(coordinates[i], y)
                for (const tile of tileList) {
                  if (tile.type === wallT) {
                    tileList[0].y += 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }
        }, ms * (tick + 1))

        tick++
      }

      break
    }
    case "bottom": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

      //randomly remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 11)] = ""
      }

      //add it to the map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(coordinates[i], 11, wallB)
        }
      }

      //animate going up
      let tick = 0
      for (let y = 12; y > 0; y--) {
        //for every ms, move the cluster one tile
        setTimeout(() => {
          //the cluster moved fully to the end. delete it
          if (y === 1) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(coordinates[i], 0)
              for (const tile of tileList) {
                if (tile.type === wallB) {
                  tile.remove()
                }
              }
            }
          } else {
            //for each tile in cluster
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(coordinates[i], (y - 1))
                for (const tile of tileList) {
                  if (tile.type === wallB) {
                    tileList[0].y -= 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }
        }, ms * (tick + 1))

        tick++
      }

      break
    }
    case "left": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

      //random remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 8)] = ""
      }

      //add it to map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(0, coordinates[i], wallL)
        }
      }

      //animate it going right
      let tick = 0
      for (let x = 0; x < 15; x++) {
        setTimeout(() => {
          //the cluster moved fully to the end
          if (x === 14) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(14, coordinates[i])
              for (const tile of tileList) {
                if (tile.type === wallL) {
                  tile.remove()
                }
              }
            }
          } else {
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(x, coordinates[i])
                for (const tile of tileList) {
                  if (tile.type === wallL) {
                    tileList[0].x += 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }

        }, ms * (tick + 1))
        tick++
      }

      break
    }
    case "right": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

      //random remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 8)] = ""
      }

      //add it to map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(14, coordinates[i], wallR)
        }
      }

      let tick = 0
      for (let x = 15; x > 0; x--) {
        setTimeout(() => {
          //the cluster moved fully to the end
          if (x === 1) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(0, coordinates[i])
              for (const tile of tileList) {
                if (tile.type === wallR) {
                  tile.remove()
                }
              }
            }
          } else {
            console.log("animating", x)
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile((x - 1), coordinates[i])
                for (const tile of tileList) {
                  if (tile.type === wallR) {
                    tileList[0].x -= 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }

        }, ms * (tick + 1))
        tick++
      }

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
  addWall("right", 5, 250)
})

onInput("j", () => {

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