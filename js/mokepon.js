//botón para seleccionar mascota
const btnPet = document.getElementById('btn-pet');
//botones para ataque
/* const btnFire = document.getElementById('button-fire');
const btnWater = document.getElementById('button-water');
const btnEarth = document.getElementById('button-earth'); */
//sección de reiniciar
const sectionRestart = document.querySelector('.section-restart');
//botón para reiniciar juego
const btnRestart = document.getElementById('btn-restart');

//Contenedores para seleccionar mascota y ataque respectivamente
const containerSelectPet = document.getElementById('select-pet');
const containerSelectAttack = document.getElementById('select-attack');
const containerMokepons = document.getElementById('container-cards');
const containerBtnsAttack = document.getElementById('container-btns-attack');

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

let mokepons = [];
let optionsMokepons;

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

//mokepon del enemigo
let mokeponEnemy;
let attacksMokeponEnemy = [];
let sequenceAttackEnemy = [];
let attackEnemy;
let victoriesEnemy = 0;

let btns = [];
let btnFire;
let btnWater;
let btnEarth;
let livesPetPlayer = 3;
let livesPetEnemy = 3;

class Mokepon {
  constructor({name, photo, live, state = false, type}){
    this.name = name,
    this.photo = photo,
    this.live = live,
    this.state = state,
    this.attacks = []
    this.type = type
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
  btnRestart.addEventListener('click', restart)
}

function randomNumber(min, max) {
  let result;
  result = Math.floor(Math.random()*(max-min+1)+min);
  return result;
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
    alert('Debes seleccionar una mascota');
    return;
  }

  containerSelectPet.style.display = 'none';
  containerSelectAttack.style.display = 'flex';
  spanLivesPetPlayer.innerText = livesPetPlayer;
  selectEnemyPet();
  
}

function extractDataMokeponSelect(inputSelect) {
  playerNamePet.innerText = inputSelect;
  mokeponPlayer = mokepons.find(mokepon => mokepon.name == inputSelect);
  mokeponPlayer.state = true;
  livesPetPlayer = mokeponPlayer.live;

  showAttackPlayer();
}

function showAttackPlayer() {
  let attacksMokeponPlayer = mokeponPlayer.attacks;

  attacksMokeponPlayer.find((attack) => {
    optionsAttack = `
    <button class="btn-attack button-attack" id=${attack.id}>${attack.name}</button>
      ` 
    containerBtnsAttack.innerHTML += optionsAttack;    
  });

  btnFire = document.getElementById('button-fire');
  btnWater = document.getElementById('button-water');
  btnEarth = document.getElementById('button-earth');

  btns = document.querySelectorAll('.button-attack');

}

function selectEnemyPet() {
  mokeponEnemy = mokepons[randomNumber(min, max)];
  attacksMokeponEnemy = mokeponEnemy.attacks;
  livesPetEnemy = mokeponEnemy.live;
  enemyNamePet.innerText = mokeponEnemy.name;
  spanLivesPetEnemy.innerText = livesPetEnemy;
  attackSequence();
}

function attackSequence() {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let buttonText = e.target.textContent;
      if(buttonText == '🔥'){
        sequenceAttackPlayer.push('FUEGO 🔥');
        btn.style.background = '#3D1766';
        btn.disabled = true;
      } else if(buttonText == '🌊'){
        sequenceAttackPlayer.push('AGUA 🌊')
        btn.style.background = '#3D1766';
        btn.disabled = true;
      } else {
        sequenceAttackPlayer.push('TIERRA 🌎')
        btn.style.background = '#3D1766';
        btn.disabled = true;
      }
      attackRandomEnemy();
    });
  })
}

function attackRandomEnemy() {
  let attackRandomMokeponEnemy = attacksMokeponEnemy[randomNumber(min,attacksMokeponEnemy.length -1)];

  let updateAttacks = attacksMokeponEnemy.filter((attack) => attack !== attackRandomMokeponEnemy);

  attacksMokeponEnemy = updateAttacks;
  
  if(attackRandomMokeponEnemy.name == '🔥'){
    sequenceAttackEnemy.push('FUEGO 🔥')
  } else if(attackRandomMokeponEnemy.name == '🌊'){
    sequenceAttackEnemy.push('AGUA 🌊')
  } else {
    sequenceAttackEnemy.push('TIERRA 🌎')
  }

  startCombat();
}

function startCombat(){
  if(sequenceAttackEnemy.length == 5){
    combat();
  }
  
}

function attackBothPlayers(player, enemy){
  attackPlayer = sequenceAttackPlayer[player];
  attackEnemy = sequenceAttackEnemy[enemy];
}

function combat() {
  let result;
  for (let index = 0; index < sequenceAttackPlayer.length; index++) {
    attackBothPlayers(index, index);
    if(sequenceAttackPlayer[index] == sequenceAttackEnemy[index]){
      result = 'EMPATASTE';
      createMessages(result);
    }
    else if(sequenceAttackPlayer[index] == 'FUEGO 🔥' && sequenceAttackEnemy[index] == 'TIERRA 🌎'){
      result = 'GANASTE'; 
      createMessages(result);
      livesPetEnemy--;
      victoriesPlayer++;
    } else if(sequenceAttackPlayer[index] == 'AGUA 🌊' && sequenceAttackEnemy[index] == 'FUEGO 🔥'){
      result = 'GANASTE';
      createMessages(result);
      livesPetEnemy--;
      victoriesPlayer++;
    } else if(sequenceAttackPlayer[index] == 'TIERRA 🌎' && sequenceAttackEnemy[index] == 'AGUA 🌊'){
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

function restart(){
  location.reload();
}

window.addEventListener('load', startPlay)
