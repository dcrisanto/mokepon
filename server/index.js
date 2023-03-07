const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.static('public'))
//Acceso desde el celular en la misma red. En el caso de s.o linux, mac
//http://N580VD-juandiego.local:8080
app.use(express.json())

let players = []
let enemys = []

const min = 0;
const max = 100;

class Player {
  constructor(id){
    this.id = id
  }

  assignMokepon(mokepon){
    this.mokepon = mokepon
  }

  updatePosition(x, y){
    this.mokepon.x = x
    this.mokepon.y = y
  }

  assignAttacks(listAttacks){
    this.mokepon.sequenceAttacks = listAttacks;
  }

}

class Mokepon {
  constructor({id, name, photo, live, state = false, attacks, sequenceAttacks = [], type, width, height ,x, y}){
    this.id = id;
    this.name = name,
    this.photo = photo,
    this.live = live,
    this.state = state,
    this.attacks = attacks,
    this.sequenceAttacks = sequenceAttacks,
    this.type = type
    this.width = width,
    this.height = height,
    this.x = x,
    this.y = y
  }

}

function numberRandom(min, max){
  const number = Math.floor(Math.random()*(max-min+1)+min)
  return number
}

app.get("/mokepon/joinGame", (req, res) => {
  const id = numberRandom(min, max)
  const player = new Player(id);
  players.push(player)
  //res.setHeader("Access-Control-Allow-Origin", "*")
  res.send(`${id}`)
})

app.post("/mokepon/:playerId", (req, res) => {
  const playerId = req.params.playerId || ""
  const body = req.body.mokepon
  const mokepon = new Mokepon(body)
  const indexPlayer = players.findIndex((player) => player.id == playerId)
  if(indexPlayer >= 0){
    players[indexPlayer].assignMokepon(mokepon)
  }
  res.end()
})

app.post("/mokepon/:playerId/enemys", (req, res) => {
  const playerId = req.params.playerId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const indexPlayer = players.findIndex((player) => player.id == playerId)

  if(indexPlayer >= 0){
    players[indexPlayer].updatePosition(x, y)
  }

  const enemys = players.filter((player) => player.id != playerId)

  res.send({enemys})
})

app.post("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const sequenceAttacks = req.body.sequenceAttacks || []
  const indexPlayer = players.findIndex((player) => player.id == playerId)
  if(indexPlayer >= 0){
    players[indexPlayer].assignAttacks(sequenceAttacks)
  }
  res.end()
})

app.get("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const enemyMokeponCollision = players.filter((player) => player.id == playerId)[0].mokepon

  const sequenceAttacksEnemyCollision = enemyMokeponCollision.sequenceAttacks
  res.send({sequenceAttacksEnemyCollision})
})

app.post("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
})

app.delete("/mokepon/delete/:playerId", (req, res) => {
  const playerId = req.params.playerId || ""
  const indexPlayer = players.findIndex((player) => player.id == playerId)
  players.splice(indexPlayer, 1)
  res.end()
})

app.listen(8080, () => {
  console.log('Servidor iniciando');
})
