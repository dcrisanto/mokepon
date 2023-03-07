//botón para seleccionar mascota
const btnPet = document.getElementById('btn-pet');
//sección de reiniciar
const sectionRestart = document.querySelector('.section-restart');
//botón para reiniciar juego
const btnRestart = document.getElementById('btn-restart');

//Contenedores para seleccionar mascota y ataque respectivamente
const containerSelectPet = document.getElementById('select-pet');
const containerSelectAttack = document.getElementById('select-attack');
const containerMokepons = document.getElementById('container-cards');
const containerBtnsAttack = document.getElementById('container-btns-attack');
const sectionSeeMap = document.getElementById('see-map');
const map = document.getElementById('map');

//Nombre mascota del juegador y del enemigo
const playerNamePet = document.getElementById('name-pet-player');
const enemyNamePet = document.getElementById('name-pet-enemy');
//Vidas del jugador y enemigo respectivamente
const spanLivesPetPlayer = document.getElementById('lives-pet-player');
const spanLivesPetEnemy = document.getElementById('lives-pet-enemy');

const containerResultRestart = document.getElementById('result-restart');
const resultAttack = document.getElementById('message-end-attack');
const attacksPlayer = document.getElementById('attacks-player');
const attacksEnemy = document.getElementById('attacks-enemy');
const containerMessageEnd = document.getElementById('message-end-attack');
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnRigth = document.getElementById('btn-rigth');
const btnLeft = document.getElementById('btn-left');

let mokepons = [];
let optionsMokepons;

//url
const url = 'http://n580vd-juandiego.local:8080'

//mokepons
let inputAudino;
let inputBellossom;
let inputBounsweet;
let inputCelebi;
let inputChansey;
let inputCharmander;

//mokepon del jugador
let mokeponPlayer;
let sequenceAttackPlayer = [];
let attackPlayer;
let optionsAttack;
let victoriesPlayer = 0;
let powerMokeponPlayer;

//mokepon del enemigo
let mokeponEnemy;
let mokeponEnemys = [];
let attacksMokeponEnemy = [];
let sequenceAttackEnemy = [];
let attackEnemy;
let victoriesEnemy = 0;
let powerMokeponEnemy;

//collision
let mokeponEnemyCollision;

let btns = [];
let btnFire;
let btnWater;
let btnEarth;
let livesPetPlayer;
let livesPetEnemy;
let canvas = map.getContext('2d');
let interval;
let mapBackground = new Image();
mapBackground.src = 'imgs/mapbackground.jpg';
let heightWeSeek;
let widthMap = window.innerWidth - 40;
const widthMaxMap = 500;
let playerId;
let stopFunction = false;

if(widthMap > widthMaxMap){
  widthMap = widthMaxMap - 40;
}

heightWeSeek = widthMap * 5 / 4;
map.width = widthMap;
map.height = heightWeSeek;

class Mokepon {
  constructor({id = "", name, photo, live, state = false, type, sequenceAttacks = []}){
    this.id = id,
    this.name = name,
    this.photo = photo,
    this.live = live,
    this.state = state,
    this.attacks = [],
    this.sequenceAttacks = sequenceAttacks,
    this.type = type,
    this.width = 50,
    this.height = 50,
    this.x = randomNumber(0, map.width - this.width),
    this.y = randomNumber(0, map.height - this.height),
    this.imageMokepon = new Image(),
    this.imageMokepon.src = photo,
    this.speedX = 0,
    this.speedY = 0
  }
  drawMokepon(){
    canvas.drawImage(
      this.imageMokepon,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const audino = new Mokepon({name: 'Audino', photo: 'imgs/audino.png', live: 5, type: 'water'});
const bellossom = new Mokepon({name: 'Bellossom', photo: 'imgs/bellossom.png', live: 5, type: 'earth'});
const bounsweet = new Mokepon({name: 'Bounsweet', photo: 'imgs/bounsweet.jpg', live: 5, type: 'earth'});
const celebi = new Mokepon({name: 'Celebi', photo: 'imgs/celebi.png', live: 5, type: 'water'});
const chansey = new Mokepon({name: 'Chansey', photo: 'imgs/chansey.gif', live: 5, type: 'fire'});
const charmander = new Mokepon({name: 'Charmander', photo: 'imgs/charmander.png', live: 5, type: 'fire'});

audino.attacks.push(
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-earth',
    name: '🌎'
  }
);

bellossom.attacks.push(
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-fire',
    name: '🔥'
  }

);

bounsweet.attacks.push(
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-fire',
    name: '🔥'
  }
);

celebi.attacks.push(
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-water',
    name: '🌊'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-fire',
    name: '🔥'
  }
);

chansey.attacks.push(
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-water',
    name: '🌊'
  }
);

charmander.attacks.push(      
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-fire',
    name: '🔥'
  },
  {
    id: 'button-earth',
    name: '🌎'
  },
  {
    id: 'button-water',
    name: '🌊'
  }
);

mokepons.push(audino, bellossom, bounsweet, celebi, chansey, charmander);

let min = 0;
let max = mokepons.length - 1;

function startPlay() {
  sectionSeeMap.classList.add('hidden');
  mokepons.find((mokepon) => {
    optionsMokepons = `
      <div class="card-pet">
        <img src=${mokepon.photo} alt="mascota ${mokepon.name}" />
        <label for=${mokepon.name}>${mokepon.name}</label>
        <input type="radio" name="pet" id=${mokepon.name} />
      </div>
    `
    containerMokepons.innerHTML += optionsMokepons;
  });

  inputAudino = document.getElementById('Audino');
  inputBellossom = document.getElementById('Bellossom');
  inputBounsweet = document.getElementById('Bounsweet');
  inputCelebi = document.getElementById('Celebi');
  inputChansey = document.getElementById('Chansey');
  inputCharmander = document.getElementById('Charmander');
  
  btnPet.addEventListener('click', selectPlayerMokepon);
  btnRestart.addEventListener('click', restart);

  btnUp.addEventListener('mousedown', moveMokeponUp);
  btnDown.addEventListener('mousedown', moveMokeponDown);
  btnRigth.addEventListener('mousedown', moveMokeponRigth);
  btnLeft.addEventListener('mousedown', moveMokeponLeft);

  btnUp.addEventListener('mouseup', stopMokepon);
  btnDown.addEventListener('mouseup', stopMokepon);
  btnRigth.addEventListener('mouseup', stopMokepon);
  btnLeft.addEventListener('mouseup', stopMokepon);

  btnUp.addEventListener('touchstart', moveMokeponUp);
  btnDown.addEventListener('touchstart', moveMokeponDown);
  btnRigth.addEventListener('touchstart', moveMokeponRigth);
  btnLeft.addEventListener('touchstart', moveMokeponLeft);

  btnUp.addEventListener('touchend', stopMokepon);
  btnDown.addEventListener('touchend', stopMokepon);
  btnRigth.addEventListener('touchend', stopMokepon);
  btnLeft.addEventListener('touchend', stopMokepon);

  getPlayerId();
}

function getPlayerId(){
  fetch(`${url}/mokepon/joinGame`)
    .then( (res) =>{
      if(res.ok){
        res.text()
          .then( (id) => playerId = id )
      }
    })
}

function selectPlayerMokepon() {

  if(inputAudino.checked){
    extractDataMokeponSelect(inputAudino.id);
  } else if(inputBellossom.checked) {
    extractDataMokeponSelect(inputBellossom.id);
  } else if(inputBounsweet.checked){
    extractDataMokeponSelect(inputBounsweet.id);
  } else if(inputCelebi.checked){
    extractDataMokeponSelect(inputCelebi.id);
  } else if(inputChansey.checked){
    extractDataMokeponSelect(inputChansey.id);
  } else if(inputCharmander.checked){
    extractDataMokeponSelect(inputCharmander.id);
  } else {
    alert('Debes seleccionar un Mokepon');
    return;
  }

  sectionSeeMap.classList.remove('hidden');
  //generar una area en el canvas: x, y, width y higth
  //canvas.fillRect(4, 6, 20, 40);
  sectionSeeMap.classList.add('section-see-map');

  containerSelectPet.style.display = 'none';

  postMokeponPlayer();
  startMap();
  
}

function extractDataMokeponSelect(inputSelect) {
  playerNamePet.innerText = inputSelect;
  mokeponPlayer = mokepons.find(mokepon => mokepon.name == inputSelect);
  mokeponPlayer.state = true;
  mokeponPlayer.id = playerId;
  livesPetPlayer = mokeponPlayer.live;
}

function postMokeponPlayer() {
  fetch(`${url}/mokepon/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mokeponPlayer
    })
  })
}

function startMap(){
  //getBoundingClientRect: propiedad para obtener las dimensiones de elemento html
  //console.log(map.getBoundingClientRect());
  interval = setInterval(drawCanvas, 100);
  drawCanvas()
  window.addEventListener('keydown', moveMokepon);
  window.addEventListener('keyup', stopMokepon);
}

function drawCanvas() {
    mokeponPlayer.x += mokeponPlayer.speedX;
    mokeponPlayer.y += mokeponPlayer.speedY;
    canvas.clearRect(0,0, map.width, map.height);
    canvas.drawImage(
      mapBackground,
      0,
      0,
      map.width,
      map.height
    );
    mokeponPlayer.drawMokepon();
    getMokeponEnemys();
    
      mokeponEnemys.forEach((mokepon) => {
        if(mokepon.hasOwnProperty('name')){
          //if(!stopFunction){
            mokepon.drawMokepon()
            checkCollision(mokepon);
          //}
        }
      })    
}

function getMokeponEnemys(){
  fetch(`${url}/mokepon/${playerId}/enemys`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x: mokeponPlayer.x,
      y: mokeponPlayer.y
    })
  })
    .then((res) => {
      if(res.ok){
        res.json()
          .then(({enemys}) => {
            mokeponEnemys = enemys.map((enemy) => {
              if(!enemy.hasOwnProperty('mokepon')){
                return enemy;
              } else {
                mokeponEnemy = new Mokepon({id: enemy.id, name: enemy.mokepon.name, photo: enemy.mokepon.photo, live: enemy.mokepon.live, type: enemy.mokepon.type}); 
              }
              mokeponEnemy.attacks = enemy.mokepon.attacks;
              mokeponEnemy.x = enemy.mokepon.x;
              mokeponEnemy.y = enemy.mokepon.y;
              return mokeponEnemy
            })
          })
      }
    })
}

function checkCollision(mokeponEnemy_){
  const upMokeponPlayer = mokeponPlayer.y;
  const downMokeponPlayer = mokeponPlayer.y + mokeponPlayer.height;
  const rightMokeponPlayer = mokeponPlayer.x + mokeponPlayer.width;
  const leftMokeponPlayer = mokeponPlayer.x;
  
  const upMokeponEnemy = mokeponEnemy_.y;
  const downMokeponEnemy = mokeponEnemy_.y + mokeponEnemy_.height;
  const rightMokeponEnemy = mokeponEnemy_.x + mokeponEnemy_.width;
  const leftMokeponEnemy = mokeponEnemy_.x;

  if(downMokeponPlayer < upMokeponEnemy || upMokeponPlayer > downMokeponEnemy || rightMokeponPlayer < leftMokeponEnemy || leftMokeponPlayer > rightMokeponEnemy){
    console.log('No existe colisión');
    return;
  }
  stopFunction = true;
  stopMokepon();
  clearInterval(interval)
  sectionSeeMap.classList.remove('section-see-map');
  sectionSeeMap.classList.add('hidden');
  containerSelectAttack.style.display = 'flex';
  spanLivesPetPlayer.innerText = livesPetPlayer; 
  mokeponEnemyCollision = mokeponEnemy_;
  checkingPowerMokepons();
}

function checkingPowerMokepons(){
  livesPetEnemy = mokeponEnemyCollision.live;
  enemyNamePet.innerText = mokeponEnemyCollision.name;
  spanLivesPetEnemy.innerText = livesPetEnemy;

  powerMokeponPlayer = mokeponPlayer.type;
  powerMokeponEnemy = mokeponEnemyCollision.type;
  if(powerMokeponPlayer === powerMokeponEnemy){
    showAttackPlayer();
  } else {
    addAttackPlayer();
  }
}

function showAttackPlayer() {
  let attacksMokeponPlayer = mokeponPlayer.attacks;

  attacksMokeponPlayer.find((attack) => {
    optionsAttack = `
    <button class="btns btn-attack button-attack" id=${attack.id}>${attack.name}</button>
      ` 
    containerBtnsAttack.innerHTML += optionsAttack;    
  });

  btnFire = document.getElementById('button-fire');
  btnWater = document.getElementById('button-water');
  btnEarth = document.getElementById('button-earth');

  btns = document.querySelectorAll('.button-attack');

  attackSequence();
}

function attackSequence() {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let buttonText = e.target.textContent;
      if(buttonText == '🔥'){
        mokeponPlayer.sequenceAttacks.push('FUEGO 🔥');
        btn.style.background = '#3D1766';
        btn.disabled = true;
      } else if(buttonText == '🌊'){
        mokeponPlayer.sequenceAttacks.push('AGUA 🌊')
        btn.style.background = '#3D1766';
        btn.disabled = true;
      } else {
        mokeponPlayer.sequenceAttacks.push('TIERRA 🌎')
        btn.style.background = '#3D1766';
        btn.disabled = true;
      }
      if(mokeponPlayer.sequenceAttacks.length >= 5){
        postAttacks();
      }
      //attackRandomEnemy();
      //getAttacksEnemyCollision()
    });
  })
}

function postAttacks(){
  fetch(`${url}/mokepon/${playerId}/attacks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sequenceAttacks: mokeponPlayer.sequenceAttacks
    })
  })

  interval = setInterval(getAttacksEnemyCollision, 50);
}

function getAttacksEnemyCollision(){
  fetch(`${url}/mokepon/${mokeponEnemyCollision.id}/attacks`)
    .then( (res) =>{
      if(res.ok){
        res.json()
          .then( ({sequenceAttacksEnemyCollision}) => {
            if(sequenceAttacksEnemyCollision.length >= 5){
              clearInterval(interval)
              mokeponEnemyCollision.sequenceAttacks = sequenceAttacksEnemyCollision;
              startCombat();
            }
          })
      }
    })
}

function startCombat(){
  if(mokeponEnemyCollision.sequenceAttacks.length >= 5){
    combat();
  } 
}

function combat() {
  let result;
  for (let index = 0; index < mokeponPlayer.sequenceAttacks.length; index++) {
    attackBothPlayers(index, index);
    if(attackPlayer == attackEnemy){
      result = 'EMPATASTE';
      createMessages(result);
    }
    else if(attackPlayer == 'FUEGO 🔥' && attackEnemy == 'TIERRA 🌎'){
      result = 'GANASTE'; 
      createMessages(result);
      livesPetEnemy--;
      victoriesPlayer++;
    } else if(attackPlayer == 'AGUA 🌊' && attackEnemy == 'FUEGO 🔥'){
      result = 'GANASTE';
      createMessages(result);
      livesPetEnemy--;
      victoriesPlayer++;
    } else if(attackPlayer == 'TIERRA 🌎' && attackEnemy == 'AGUA 🌊'){
      result = 'GANASTE';
      createMessages(result);
      livesPetEnemy--;
      victoriesPlayer++;
    } else {
      result = 'PERDISTE';
      createMessages(result);
      livesPetPlayer--;
      victoriesEnemy++;
    }
  }

    spanLivesPetPlayer.innerText = livesPetPlayer;
    spanLivesPetEnemy.innerText = livesPetEnemy;

    reviewVictories();
  
}

function attackBothPlayers(indexPlayer, indexEnemy){
  attackPlayer = mokeponPlayer.sequenceAttacks[indexPlayer];
  attackEnemy = mokeponEnemyCollision.sequenceAttacks[indexEnemy];
}

function createMessages(result) {
  containerResultRestart.style.display = 'flex';
  attacksPlayer.style.display = 'flex';
  attacksEnemy.style.display = 'flex';
  let attackPlayerSelect = document.createElement('p');
  attackPlayerSelect.classList.add('result-attack');
  attackPlayerSelect.innerText = `${attackPlayer}`;
  attacksPlayer.appendChild(attackPlayerSelect);
  let attackEnemyRandom = document.createElement('p');
  attackEnemyRandom.classList.add('result-attack');
  attackEnemyRandom.innerText = `${attackEnemy}`;
  attacksEnemy.appendChild(attackEnemyRandom);
  resultAttack.innerText = result;
}

function reviewVictories() {
  if(victoriesPlayer < victoriesEnemy){
    messageEnd('LO SIENTO PERDISTE');
    containerMessageEnd.style.display = 'flex';
  } else if(victoriesPlayer > victoriesEnemy){
    messageEnd('FELICITACIONES GANASTE');
    containerMessageEnd.style.display = 'flex';
  } else {
    messageEnd('QUEDARON EMPATADOS')
  }
}

function messageEnd(result) {
  containerMessageEnd.innerText = `¡${result}!`;
  sectionRestart.classList.add('show');
}

function addAttackPlayer(){
  if(powerMokeponPlayer === 'fire' && powerMokeponEnemy === 'earth'){
    mokeponPlayer.attacks.push(
      {
        id: 'button-fire',
        name: '🔥'
      }
    );
    showAttackPlayer();
  } else if(powerMokeponPlayer === 'water' && powerMokeponEnemy === 'fire'){
    mokeponPlayer.attacks.push(
      {
        id: 'button-water',
        name: '🌊'
      }
    );
    showAttackPlayer();
  } else if(powerMokeponPlayer === 'earth' && powerMokeponEnemy === 'water'){
    mokeponPlayer.attacks.push(
      {
        id: 'button-earth',
        name: '🌎'
      }
    );
    showAttackPlayer();
  } else {
    addAttackEnemy();
  }

}

function addAttackEnemy(){
  if(powerMokeponEnemy === 'fire' && powerMokeponPlayer === 'earth'){
    mokeponEnemyCollision.attacks.push(
      {
        id: 'button-fire',
        name: '🔥'
      }
    )
  } else if(powerMokeponEnemy === 'water' && powerMokeponPlayer === 'fire'){
    mokeponEnemyCollision.attacks.push(
      {
        id: 'button-water',
        name: '🌊'
      }
    )
  } else if(powerMokeponEnemy === 'earth' && powerMokeponPlayer === 'water'){
    mokeponEnemyCollision.attacks.push(
      {
        id: 'button-earth',
        name: '🌎'
      }
    )
  } else {
    alert('El poder del mokepon no existe');
  }

  showAttackPlayer();
}

function moveMokepon(event) {
  if(!stopFunction){
    let keyCode = event.keyCode;
    switch(keyCode){
      case 37:
        moveMokeponLeft();
        break;
      case 38:
        moveMokeponUp();
        break;
      case 39:
        moveMokeponRigth();
        break;
      case 40:
        moveMokeponDown();
        break;
      default:
        break
    }

  drawCanvas();
  }
}

function stopMokepon(){
  mokeponPlayer.speedX = 0;
  mokeponPlayer.speedY = 0;
}

function moveMokeponUp(){
  mokeponPlayer.speedY = -5;
}

function moveMokeponDown(){
  mokeponPlayer.speedY = 5;
}

function moveMokeponRigth(){
  mokeponPlayer.speedX = 5;
}

function moveMokeponLeft(){
  mokeponPlayer.speedX = -5;
}

function randomNumber(min, max) {
  let result;
  result = Math.floor(Math.random()*(max-min+1)+min);
  return result;
}

function restart(){
  deleteMokepon()
  location.reload();
}

function deleteMokepon(){
    fetch(`${url}/mokepon/delete/${playerId}`, {
      method: "delete",
    })

    .then( (res) =>{
      if(res.ok){
        console.log('elemento eliminado');
      }
    })
}

window.addEventListener('load', startPlay)
